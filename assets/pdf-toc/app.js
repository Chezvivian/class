/**
 * PDF TOC Tool — browser-local heading detection + bookmark writing.
 * Depends on: pdf.js (pdfjsLib), @cantoo/pdf-lib (PDFLib), outline.js (PdfTocOutline)
 *
 * Detection strategy (English academic books):
 *  1) Parse Contents / Table of Contents pages (leader dots + page)
 *  2) Fallback: Chapter/Part labels merged with following title lines
 */
(function () {
  'use strict';

  var state = {
    fileName: '',
    pdfBytes: null,
    pageCount: 0,
    isScanned: false,
    rows: [],
  };

  var els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function setStatus(msg, kind) {
    els.status.textContent = msg || '';
    els.status.style.color =
      kind === 'error' ? '#dc3545' : kind === 'ok' ? '#28a745' : '#666';
  }

  function setProgress(show, pct, label) {
    els.progressContainer.style.display = show ? 'block' : 'none';
    if (typeof pct === 'number') {
      els.progressBar.style.width = Math.max(0, Math.min(100, pct)) + '%';
      els.progressText.textContent = Math.round(pct) + '%';
    }
    if (label != null) els.progressLabel.textContent = label;
  }

  var PDFJS_CDN = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs';
  var PDFJS_WORKER = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

  async function configurePdfJs() {
    if (!window.pdfjsLib) {
      try {
        window.pdfjsLib = await import(PDFJS_CDN);
      } catch (e) {
        throw new Error('pdf.js 加载失败，请检查网络或 CDN：' + (e.message || e));
      }
    }
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  }

  function extractLinesFromTextContent(textContent, pageIndex0) {
    var items = (textContent.items || []).filter(function (it) {
      return it && typeof it.str === 'string' && it.str.trim().length > 0;
    });

    var raw = items.map(function (it) {
      var t = it.transform || [1, 0, 0, 1, 0, 0];
      var fontSize = Math.hypot(t[0], t[1]) || Math.abs(t[3]) || it.height || 0;
      return {
        str: it.str,
        x: t[4],
        y: t[5],
        fontSize: fontSize,
      };
    });

    raw.sort(function (a, b) {
      if (Math.abs(a.y - b.y) > 2) return b.y - a.y;
      return a.x - b.x;
    });

    var lines = [];
    var current = null;
    var yTol = 3;

    raw.forEach(function (item) {
      if (!current || Math.abs(current.y - item.y) > Math.max(yTol, item.fontSize * 0.35)) {
        current = {
          page: pageIndex0 + 1,
          y: item.y,
          x: item.x,
          fontSize: item.fontSize,
          parts: [item.str],
        };
        lines.push(current);
      } else {
        // Insert space when glyphs are clearly separated
        var prev = current.parts[current.parts.length - 1];
        var gap = item.x - current.x;
        if (current.parts.length && item.x > current.x + 1) {
          var needSpace =
            !/\s$/.test(prev) && !/^\s/.test(item.str) && !/^[\.,;:!\?]/.test(item.str);
          current.parts.push((needSpace ? ' ' : '') + item.str);
        } else {
          current.parts.push(item.str);
        }
        current.fontSize = Math.max(current.fontSize, item.fontSize);
        current.x = Math.min(current.x, item.x);
      }
    });

    return lines.map(function (ln) {
      return {
        page: ln.page,
        y: ln.y,
        x: ln.x,
        fontSize: ln.fontSize,
        text: ln.parts.join('').replace(/\s+/g, ' ').trim(),
      };
    });
  }

  async function analyzePdf(arrayBuffer) {
    await configurePdfJs();
    var loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
    var pdf = await loadingTask.promise;
    var pageCount = pdf.numPages;
    var allLines = [];
    var totalChars = 0;

    for (var i = 1; i <= pageCount; i++) {
      var page = await pdf.getPage(i);
      var textContent = await page.getTextContent({ includeMarkedContent: false });
      var lines = extractLinesFromTextContent(textContent, i - 1);
      lines.forEach(function (ln) {
        totalChars += ln.text.length;
        allLines.push(ln);
      });
      setProgress(true, (i / pageCount) * 70, '正在读取文字 ' + i + '/' + pageCount);
    }

    var avgChars = pageCount > 0 ? totalChars / pageCount : 0;
    var isScanned = avgChars < 40;

    return {
      pageCount: pageCount,
      isScanned: isScanned,
      avgChars: avgChars,
      lines: allLines,
    };
  }

  // ── TOC detection ──────────────────────────────────────────────

  var TOC_HEADING_RE =
    /^(table\s+of\s+contents|contents|content|list\s+of\s+contents)\s*$/i;
  var TOC_STOP_HEADING_RE =
    /^(list\s+of\s+(figures|tables|illustrations|maps|plates))\s*$/i;
  var LEADER_CHARS = /[\.·•⋯…‥﹣\-–—_]/g;
  var CHAPTER_LABEL_RE =
    /^(part|book|chapter|appendix|annex|section)\s+([IVXLCDM]+|\d+)\s*$/i;
  var FRONT_MATTER_NOISE_RE =
    /\b(copyright|all\s+rights\s+reserved|isbn[- ]?\d|library\s+of\s+congress|printed\s+in|published\s+by|©|cip\s+data|catalogu(?:ing|eing)|cataloging|rights\s+reserved)\b/i;

  function cleanTitle(title) {
    return String(title || '')
      // Only strip leader runs (2+ dots), keep "1.2" numbering intact
      .replace(/(?:[\.·•⋯…]\s*){2,}/g, ' ')
      .replace(/[-–—_]{2,}/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isBareStructuralTitle(title) {
    var t = cleanTitle(title);
    if (/^(part|book|chapter|appendix|annex|section)$/i.test(t)) return true;
    if (CHAPTER_LABEL_RE.test(t)) return true;
    return false;
  }

  function isNoiseTitle(title) {
    var t = cleanTitle(title);
    if (!t || t.length < 2) return true;
    if (/^(contents?|table of contents)$/i.test(t)) return true;
    if (/^page$/i.test(t)) return true;
    if (/^[\d\sivxlcdm]+$/i.test(t)) return true;
    if (isBareStructuralTitle(t)) return true;
    if (FRONT_MATTER_NOISE_RE.test(t)) return true;
    return false;
  }

  function hasLeaderDots(text) {
    return /[\.·•⋯…]{3,}/.test(text) || /(?:\.\s*){3,}/.test(text);
  }

  function inferLevelFromTitle(title, x, minX, maxX) {
    var t = cleanTitle(title);
    var m;

    if (/^(part|book)\b/i.test(t)) return 1;
    if (/^(chapter|appendix|annex)\b/i.test(t)) return 1;
    if (
      /^(bibliography|references|index|glossary|preface|foreword|introduction|conclusion)\b/i.test(
        t
      ) &&
      !/^\d/.test(t)
    ) {
      return 1;
    }

    m = t.match(/^(\d+(?:\.\d+){0,5})\b/);
    if (m) return Math.min(3, m[1].split('.').length);

    m = t.match(/^(?:section|sec\.?|§)\s*(\d+(?:\.\d+)*)/i);
    if (m) return Math.min(3, m[1].split('.').length + 1);

    if (
      typeof x === 'number' &&
      typeof minX === 'number' &&
      typeof maxX === 'number' &&
      maxX > minX + 8
    ) {
      var ratio = (x - minX) / (maxX - minX);
      if (ratio < 0.2) return 1;
      if (ratio < 0.55) return 2;
      return 3;
    }

    return 2;
  }

  /**
   * Parse TOC entry. Requires leader dots / wide gap before page number.
   * NEVER parses "Chapter 1" as title="Chapter", page=1.
   */
  function parseTocEntryLine(text) {
    var raw = String(text || '').replace(/\s+/g, ' ').trim();
    if (!raw || raw.length > 240) return null;
    if (FRONT_MATTER_NOISE_RE.test(raw)) return null;
    if (CHAPTER_LABEL_RE.test(raw)) return null;
    if (TOC_HEADING_RE.test(raw)) return null;

    var m = raw.match(/^(.*?)((?:[\.·•⋯…]\s*){3,}|\s{3,})(\d{1,4})\s*$/);
    if (!m) return null;

    var title = cleanTitle(m[1]);
    var page = parseInt(m[3], 10);
    if (!title || !Number.isFinite(page) || page < 1) return null;
    if (isNoiseTitle(title)) return null;
    if (isBareStructuralTitle(title)) return null;

    return {
      title: title,
      page: page,
      confidence: hasLeaderDots(raw) ? 2 : 1,
    };
  }

  function isPageOnlyLine(text) {
    return /^\s*(?:[\.·•⋯…\s]{2,})?\d{1,4}\s*$/.test(String(text || ''));
  }

  function looksLikeTitleContinuation(text) {
    var t = cleanTitle(text);
    if (!t || t.length < 2 || t.length > 160) return false;
    if (CHAPTER_LABEL_RE.test(t)) return false;
    if (TOC_HEADING_RE.test(t)) return false;
    if (FRONT_MATTER_NOISE_RE.test(t)) return false;
    if (isPageOnlyLine(t)) return false;
    if (parseTocEntryLine(t)) return true;
    // Prefer title-case / capitalised starts; reject mid-sentence leftovers
    if (/^[a-z]/.test(t)) return false;
    return true;
  }

  function lineObj(base, text, other) {
    return {
      page: base.page,
      x: other ? Math.min(base.x, other.x) : base.x,
      y: base.y,
      fontSize: other ? Math.max(base.fontSize, other.fontSize) : base.fontSize,
      text: text,
    };
  }

  /**
   * Merge multi-line TOC patterns common in English books:
   *   Chapter 1
   *   Introduction .................... 15
   */
  function coalesceTocLines(lines) {
    var out = [];
    for (var i = 0; i < lines.length; i++) {
      var cur = lines[i];
      var text = String(cur.text || '').trim();
      var next = lines[i + 1];
      var next2 = lines[i + 2];

      if (CHAPTER_LABEL_RE.test(text) && next && cur.page === next.page) {
        var m2 = text + ' ' + String(next.text || '').trim();
        if (parseTocEntryLine(m2)) {
          out.push(lineObj(cur, m2, next));
          i += 1;
          continue;
        }

        if (
          next2 &&
          cur.page === next2.page &&
          looksLikeTitleContinuation(next.text) &&
          isPageOnlyLine(next2.text)
        ) {
          var m3 = text + ' ' + String(next.text).trim() + ' .... ' + String(next2.text).trim();
          if (parseTocEntryLine(m3)) {
            out.push(lineObj(cur, m3, next));
            i += 2;
            continue;
          }
        }

        if (looksLikeTitleContinuation(next.text)) {
          var mTitle = text + ' ' + String(next.text).trim();
          if (next2 && cur.page === next2.page && isPageOnlyLine(next2.text)) {
            var mTitlePage = mTitle + ' .... ' + String(next2.text).trim();
            if (parseTocEntryLine(mTitlePage)) {
              out.push(lineObj(cur, mTitlePage, next));
              i += 2;
              continue;
            }
          }
          // Keep "Chapter N Title" for a later page-only join
          out.push(lineObj(cur, mTitle, next));
          i += 1;
          continue;
        }
      }

      if (
        next &&
        cur.page === next.page &&
        isPageOnlyLine(next.text) &&
        !parseTocEntryLine(text)
      ) {
        var withPage = text + ' .... ' + String(next.text).trim();
        if (parseTocEntryLine(withPage)) {
          out.push(lineObj(cur, withPage, next));
          i += 1;
          continue;
        }
      }

      out.push(cur);
    }
    return out;
  }

  function countTocEntries(pageLines) {
    var n = 0;
    var strong = 0;
    coalesceTocLines(pageLines).forEach(function (ln) {
      var e = parseTocEntryLine(ln.text);
      if (e) {
        n += 1;
        if (e.confidence >= 2) strong += 1;
      }
    });
    return { n: n, strong: strong };
  }

  function findContentsStartPage(lines, pageCount) {
    var scanLimit = Math.min(pageCount, Math.max(25, Math.ceil(pageCount * 0.25)));
    var best = null;

    for (var p = 1; p <= scanLimit; p++) {
      var pageLines = lines.filter(function (ln) {
        return ln.page === p;
      });
      var hasHeading = pageLines.some(function (ln) {
        return TOC_HEADING_RE.test(ln.text.trim());
      });
      var counts = countTocEntries(pageLines);

      if (hasHeading) {
        var nextN = 0;
        if (p + 1 <= pageCount) {
          nextN = countTocEntries(
            lines.filter(function (ln) {
              return ln.page === p + 1;
            })
          ).n;
        }
        if (counts.n + nextN >= 3) return p;
      }

      if (counts.strong >= 5 && (best == null || counts.strong > best.count)) {
        best = { page: p, count: counts.strong };
      }
    }
    return best ? best.page : null;
  }

  function collectContentsPageRange(lines, startPage, pageCount) {
    var pages = [];
    var emptyStreak = 0;
    var maxPages = Math.min(pageCount, startPage + 30);

    for (var p = startPage; p <= maxPages; p++) {
      var pageLines = lines.filter(function (ln) {
        return ln.page === p;
      });
      if (
        p > startPage &&
        pageLines.some(function (ln) {
          return TOC_STOP_HEADING_RE.test(ln.text.trim());
        })
      ) {
        break;
      }

      var entries = countTocEntries(pageLines).n;
      if (p === startPage || entries >= 2) {
        pages.push(p);
        emptyStreak = entries >= 2 ? 0 : emptyStreak + 1;
      } else {
        emptyStreak += 1;
      }
      if (emptyStreak >= 2 && pages.length) break;
    }
    return pages;
  }

  function parseContentsPages(lines, pageRange) {
    var pageSet = {};
    pageRange.forEach(function (p) {
      pageSet[p] = true;
    });

    var block = coalesceTocLines(
      lines.filter(function (ln) {
        return pageSet[ln.page];
      })
    );
    // Run twice: label+title merge, then title+page merge
    block = coalesceTocLines(block);

    var xs = [];
    var rows = [];
    var seen = {};

    block.forEach(function (ln) {
      if (TOC_HEADING_RE.test(ln.text.trim())) return;
      if (CHAPTER_LABEL_RE.test(ln.text.trim())) return;
      var entry = parseTocEntryLine(ln.text);
      if (!entry) return;
      var key = entry.title.toLowerCase() + '|' + entry.page;
      if (seen[key]) return;
      seen[key] = true;
      xs.push(ln.x);
      rows.push({ title: entry.title, page: entry.page, x: ln.x });
    });

    if (!rows.length) return [];

    var minX = Math.min.apply(null, xs);
    var maxX = Math.max.apply(null, xs);
    return rows.map(function (r) {
      return {
        title: r.title,
        level: inferLevelFromTitle(r.title, r.x, minX, maxX),
        page: r.page,
      };
    });
  }

  function detectNumberedHeadings(lines, skipBeforePage) {
    var startPage = Math.max(1, skipBeforePage || 1);
    var repeating = {};
    var textPageCount = {};
    lines.forEach(function (ln) {
      var key = ln.text.toLowerCase();
      if (!textPageCount[key]) textPageCount[key] = {};
      textPageCount[key][ln.page] = true;
    });
    Object.keys(textPageCount).forEach(function (key) {
      if (Object.keys(textPageCount[key]).length >= 3) repeating[key] = true;
    });

    var sorted = lines.slice().sort(function (a, b) {
      if (a.page !== b.page) return a.page - b.page;
      return b.y - a.y;
    });

    var rows = [];
    var seen = {};

    for (var i = 0; i < sorted.length; i++) {
      var ln = sorted[i];
      if (ln.page < startPage) continue;
      var t = ln.text.trim();
      if (t.length < 3 || t.length > 160) continue;
      if (repeating[t.toLowerCase()]) continue;
      if (FRONT_MATTER_NOISE_RE.test(t)) continue;

      var title = null;
      var level = 2;

      if (CHAPTER_LABEL_RE.test(t)) {
        var next = sorted[i + 1];
        if (
          next &&
          next.page === ln.page &&
          looksLikeTitleContinuation(next.text) &&
          !CHAPTER_LABEL_RE.test(next.text.trim()) &&
          !FRONT_MATTER_NOISE_RE.test(next.text)
        ) {
          title = cleanTitle(t + ' ' + next.text);
          level = inferLevelFromTitle(title);
          i += 1;
        } else {
          continue; // never keep bare "Chapter 1"
        }
      } else {
        var patterns = [
          /^(part|book)\s+([IVXLCDM]+|\d+)\s*[:.\-–—]?\s+(.{3,120})$/i,
          /^(chapter)\s+([IVXLCDM]+|\d+)\s*[:.\-–—]?\s+(.{3,120})$/i,
          /^(appendix|annex)\s+([A-Z]|\d+)\s*[:.\-–—]?\s*(.{3,120})$/i,
          /^(\d+\.\d+(?:\.\d+){0,3})\s+([A-Z“"'(].{2,120})$/,
        ];
        var matched = false;
        for (var p = 0; p < patterns.length; p++) {
          if (!t.match(patterns[p])) continue;
          title = cleanTitle(t);
          level = inferLevelFromTitle(title);
          matched = true;
          break;
        }
        if (!matched) continue;
      }

      if (!title || isNoiseTitle(title) || isBareStructuralTitle(title)) continue;

      var key = title.toLowerCase().replace(/\s+/g, ' ');
      if (seen[key]) continue;
      seen[key] = true;
      rows.push({ title: title, level: level, page: ln.page });
    }

    if (rows.length > 400) rows = rows.slice(0, 400);
    return rows;
  }

  function detectToc(lines, pageCount) {
    if (!lines.length) {
      return { rows: [], method: 'none', detail: '' };
    }

    var start = findContentsStartPage(lines, pageCount);
    if (start != null) {
      var range = collectContentsPageRange(lines, start, pageCount);
      var tocRows = parseContentsPages(lines, range);
      if (tocRows.length >= 3) {
        return {
          rows: tocRows,
          method: 'contents',
          detail:
            '从 Contents 页（PDF 第 ' +
            range[0] +
            (range.length > 1 ? '–' + range[range.length - 1] : '') +
            ' 页）解析；表格页码多为印刷页码，请用偏移量对齐',
        };
      }
    }

    var skipBefore =
      start != null ? Math.max(start + 1, 5) : Math.min(8, Math.floor(pageCount * 0.05) + 1);
    var numbered = detectNumberedHeadings(lines, skipBefore);
    if (numbered.length) {
      return {
        rows: numbered,
        method: 'numbering',
        detail:
          '未可靠解析 Contents 条目，已按「Chapter + 标题」从正文识别（跳过前 ' +
          (skipBefore - 1) +
          ' 页扉页）；表格页码为 PDF 页码',
      };
    }

    return {
      rows: [],
      method: 'none',
      detail: '未找到可用的 Contents 条目，也未识别到带完整标题的 Chapter 行',
    };
  }

  // ── UI ─────────────────────────────────────────────────────────

  function renderTable() {
    var tbody = els.tocBody;
    tbody.innerHTML = '';

    if (!state.rows.length) {
      els.editSection.style.display = 'none';
      return;
    }

    els.editSection.style.display = 'block';
    els.rowCount.textContent = String(state.rows.length);

    state.rows.forEach(function (row, index) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td style="text-align:center;color:#888;">' +
        (index + 1) +
        '</td>' +
        '<td><input type="text" data-i="' +
        index +
        '" data-f="title" value="' +
        escapeAttr(row.title) +
        '" style="width:100%;padding:6px 8px;border:1px solid #ddd;border-radius:4px;font-size:14px;box-sizing:border-box;"></td>' +
        '<td><select data-i="' +
        index +
        '" data-f="level" style="width:100%;padding:6px 8px;border:1px solid #ddd;border-radius:4px;font-size:14px;">' +
        [1, 2, 3]
          .map(function (lv) {
            return (
              '<option value="' +
              lv +
              '"' +
              (row.level === lv ? ' selected' : '') +
              '>H' +
              lv +
              '</option>'
            );
          })
          .join('') +
        '</select></td>' +
        '<td><input type="number" min="1" data-i="' +
        index +
        '" data-f="page" value="' +
        row.page +
        '" style="width:100%;padding:6px 8px;border:1px solid #ddd;border-radius:4px;font-size:14px;box-sizing:border-box;"></td>' +
        '<td style="text-align:center;"><button type="button" data-del="' +
        index +
        '" title="删除" style="background:#fff;border:1px solid #ddd;border-radius:4px;padding:4px 10px;cursor:pointer;color:#c00;">×</button></td>';
      tbody.appendChild(tr);
    });
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function readRowsFromDom() {
    var inputs = els.tocBody.querySelectorAll('[data-f]');
    inputs.forEach(function (el) {
      var i = parseInt(el.getAttribute('data-i'), 10);
      var f = el.getAttribute('data-f');
      if (!state.rows[i]) return;
      if (f === 'title') state.rows[i].title = el.value;
      if (f === 'level') state.rows[i].level = parseInt(el.value, 10) || 1;
      if (f === 'page') state.rows[i].page = parseInt(el.value, 10) || 1;
    });
  }

  function getOffset() {
    var v = parseInt(els.pageOffset.value, 10);
    return Number.isFinite(v) ? v : 0;
  }

  async function onFileSelected(file) {
    if (!file) return;
    if (!/\.pdf$/i.test(file.name)) {
      setStatus('请选择 PDF 文件', 'error');
      return;
    }

    state.fileName = file.name;
    state.rows = [];
    state.pdfBytes = null;
    els.generateBtn.disabled = true;
    els.addRowBtn.disabled = true;
    renderTable();
    setProgress(true, 5, '正在加载 PDF…');
    setStatus('正在分析：' + file.name);

    try {
      var buffer = await file.arrayBuffer();
      state.pdfBytes = new Uint8Array(buffer);

      var result = await analyzePdf(buffer);
      state.pageCount = result.pageCount;
      state.isScanned = result.isScanned;

      els.metaBox.style.display = 'block';
      els.metaText.innerHTML =
        '文件：<b>' +
        escapeAttr(file.name) +
        '</b>　页数：<b>' +
        result.pageCount +
        '</b>　类型：<b>' +
        (result.isScanned ? '疑似扫描版' : '可编辑 PDF') +
        '</b>　平均每页字符：' +
        Math.round(result.avgChars);

      if (result.isScanned) {
        setProgress(false);
        setStatus(
          '检测到扫描版 PDF（文字层很少）。本版暂不支持 OCR，请换可编辑 PDF，或等待下一步 OCR 功能。',
          'error'
        );
        els.ocrHint.style.display = 'block';
        return;
      }

      els.ocrHint.style.display = 'none';
      setProgress(true, 85, '正在解析 Contents / 编号标题…');
      var detected = detectToc(result.lines, result.pageCount);
      state.rows = detected.rows;
      renderTable();
      setProgress(true, 100, '完成');
      setTimeout(function () {
        setProgress(false);
      }, 400);

      if (!state.rows.length) {
        setStatus(
          (detected.detail || '未自动识别到目录') +
            '。可点击「添加一行」手动填写后生成书签。',
          'error'
        );
      } else {
        setStatus(
          '已生成目录草稿 ' +
            state.rows.length +
            ' 条。' +
            (detected.detail || '') +
            '。请微调后生成书签。',
          'ok'
        );
      }
      els.generateBtn.disabled = false;
      els.addRowBtn.disabled = false;
    } catch (err) {
      console.error(err);
      setProgress(false);
      setStatus('分析失败：' + (err.message || String(err)), 'error');
    }
  }

  async function generateAndDownload() {
    if (!state.pdfBytes) {
      setStatus('请先上传 PDF', 'error');
      return;
    }
    if (!window.PDFLib || !window.PdfTocOutline) {
      setStatus('书签库未加载，请刷新页面重试', 'error');
      return;
    }

    readRowsFromDom();
    var offset = getOffset();
    var pageCount = state.pageCount;

    var adjusted = state.rows
      .map(function (r) {
        return {
          title: (r.title || '').trim(),
          level: Math.max(1, Math.min(3, parseInt(r.level, 10) || 1)),
          page: (parseInt(r.page, 10) || 1) + offset,
        };
      })
      .filter(function (r) {
        return r.title.length > 0;
      });

    if (!adjusted.length) {
      setStatus('目录为空，请至少保留一条标题', 'error');
      return;
    }

    for (var i = 0; i < adjusted.length; i++) {
      if (adjusted[i].page < 1 || adjusted[i].page > pageCount) {
        setStatus(
          '第 ' +
            (i + 1) +
            ' 条页码越界：最终 PDF 页码 = 表格页码 + 偏移量 = ' +
            adjusted[i].page +
            '（总页数 ' +
            pageCount +
            '）',
          'error'
        );
        return;
      }
    }

    els.generateBtn.disabled = true;
    setStatus('正在写入书签…');
    setProgress(true, 30, '写入书签');

    try {
      var pdfDoc = await PDFLib.PDFDocument.load(state.pdfBytes, {
        updateMetadata: false,
        ignoreEncryption: true,
      });

      var outlines = PdfTocOutline.buildNestedOutlines(adjusted);
      PdfTocOutline.setOutline(pdfDoc, outlines, PDFLib);

      try {
        var PDFName = PDFLib.PDFName;
        if (PDFName && pdfDoc.catalog) {
          pdfDoc.catalog.set(PDFName.of('PageMode'), PDFName.of('UseOutlines'));
        }
      } catch (e) {
        /* optional */
      }

      setProgress(true, 80, '导出 PDF');
      var outBytes = await pdfDoc.save({ useObjectStreams: false });
      var blob = new Blob([outBytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var base = state.fileName.replace(/\.pdf$/i, '') || 'document';
      a.href = url;
      a.download = base + '-with-toc.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 2000);

      setProgress(true, 100, '完成');
      setTimeout(function () {
        setProgress(false);
      }, 500);
      setStatus(
        '已下载带书签的 PDF（' +
          adjusted.length +
          ' 条目录）。请在阅读器中打开左侧书签面板查看。',
        'ok'
      );
    } catch (err) {
      console.error(err);
      setProgress(false);
      setStatus('生成失败：' + (err.message || String(err)), 'error');
    } finally {
      els.generateBtn.disabled = false;
    }
  }

  function bind() {
    els.fileInput = $('pdfFileInput');
    els.dropZone = $('pdfDropZone');
    els.status = $('pdfTocStatus');
    els.progressContainer = $('pdfTocProgress');
    els.progressBar = $('pdfTocProgressBar');
    els.progressText = $('pdfTocProgressText');
    els.progressLabel = $('pdfTocProgressLabel');
    els.metaBox = $('pdfTocMeta');
    els.metaText = $('pdfTocMetaText');
    els.ocrHint = $('pdfTocOcrHint');
    els.editSection = $('pdfTocEditSection');
    els.tocBody = $('pdfTocBody');
    els.rowCount = $('pdfTocRowCount');
    els.pageOffset = $('pdfPageOffset');
    els.generateBtn = $('pdfGenerateBtn');
    els.addRowBtn = $('pdfAddRowBtn');
    els.clearBtn = $('pdfClearBtn');

    els.fileInput.addEventListener('change', function () {
      var f = els.fileInput.files && els.fileInput.files[0];
      onFileSelected(f);
    });

    ['dragenter', 'dragover'].forEach(function (ev) {
      els.dropZone.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        els.dropZone.style.borderColor = '#4472c4';
        els.dropZone.style.background = '#eef3fb';
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      els.dropZone.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
        els.dropZone.style.borderColor = '#c5ced9';
        els.dropZone.style.background = '#f8fafc';
      });
    });
    els.dropZone.addEventListener('drop', function (e) {
      var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) onFileSelected(f);
    });
    els.dropZone.addEventListener('click', function () {
      els.fileInput.click();
    });

    els.tocBody.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-del]');
      if (!btn) return;
      readRowsFromDom();
      var i = parseInt(btn.getAttribute('data-del'), 10);
      state.rows.splice(i, 1);
      renderTable();
      els.rowCount.textContent = String(state.rows.length);
    });

    els.addRowBtn.addEventListener('click', function () {
      readRowsFromDom();
      state.rows.push({ title: '新标题', level: 1, page: 1 });
      renderTable();
      els.generateBtn.disabled = false;
    });

    els.clearBtn.addEventListener('click', function () {
      if (!state.rows.length) return;
      if (!confirm('清空当前目录草稿？')) return;
      state.rows = [];
      renderTable();
      setStatus('已清空目录草稿');
    });

    els.generateBtn.addEventListener('click', generateAndDownload);

    setStatus(
      '请上传可编辑 PDF。将优先解析英文 Contents（点线+页码），其次合并 Chapter 与标题行。文件仅在本地处理。'
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
