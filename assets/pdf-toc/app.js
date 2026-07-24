/**
 * PDF TOC Tool — browser-local heading detection + bookmark writing.
 * Depends on: pdf.js (pdfjsLib), @cantoo/pdf-lib (PDFLib), outline.js (PdfTocOutline)
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

  /**
   * Extract lines with font size from a page's text content.
   * Font size ≈ hypot of transform scale components.
   */
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

    // Group into lines by similar Y (tolerance relative to median font size)
    raw.sort(function (a, b) {
      if (Math.abs(a.y - b.y) > 2) return b.y - a.y; // top to bottom
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
        current.parts.push(item.str);
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

  var TOC_HEADING_RE =
    /^(table\s+of\s+contents|contents|content|list\s+of\s+contents)\s*$/i;
  var TOC_STOP_HEADING_RE =
    /^(list\s+of\s+(figures|tables|illustrations|maps|plates))\s*$/i;
  var LEADER_CHARS = /[\.·•⋯…‥﹣\-–—_]/g;

  function cleanTitle(title) {
    return String(title || '')
      .replace(LEADER_CHARS, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isNoiseTitle(title) {
    var t = cleanTitle(title);
    if (!t || t.length < 2) return true;
    if (/^(contents?|table of contents)$/i.test(t)) return true;
    if (/^page$/i.test(t)) return true;
    if (/^[\d\sivxlcdm]+$/i.test(t)) return true;
    return false;
  }

  /**
   * Infer H1–H3 from English TOC / heading numbering patterns.
   */
  function inferLevelFromTitle(title, x, minX, maxX) {
    var t = cleanTitle(title);
    var m;

    if (/^(part|book)\b/i.test(t)) return 1;
    if (/^(chapter|appendix|annex)\b/i.test(t)) return 1;
    if (/^(bibliography|references|index|glossary|preface|foreword|introduction|conclusion)\b/i.test(t) &&
        !/^\d/.test(t)) {
      return 1;
    }

    // 1.2.3 Title  or  1.2 Title
    m = t.match(/^(\d+(?:\.\d+){0,5})\b/);
    if (m) {
      var depth = m[1].split('.').length;
      return Math.min(3, depth);
    }

    // Section A.1 / § 2.1
    m = t.match(/^(?:section|sec\.?|§)\s*(\d+(?:\.\d+)*)/i);
    if (m) {
      return Math.min(3, m[1].split('.').length + 1);
    }

    // Indentation fallback within TOC block
    if (typeof x === 'number' && typeof minX === 'number' && typeof maxX === 'number' && maxX > minX + 8) {
      var ratio = (x - minX) / (maxX - minX);
      if (ratio < 0.2) return 1;
      if (ratio < 0.55) return 2;
      return 3;
    }

    return 2;
  }

  /**
   * Parse one TOC-style line into {title, page} or null.
   * Handles: "Title ...... 12" / "Title  12" / "Chapter 1 Title .... 5"
   */
  function parseTocEntryLine(text) {
    var raw = String(text || '').replace(/\s+/g, ' ').trim();
    if (!raw || raw.length > 220) return null;

    // Leaders then page number
    var m = raw.match(/^(.*?)(?:[\s\.·•⋯…‥﹣\-–—_]{2,}|\s{2,})(\d{1,4})\s*$/);
    if (m) {
      var title = cleanTitle(m[1]);
      var page = parseInt(m[2], 10);
      if (!isNoiseTitle(title) && page >= 1) {
        return { title: title, page: page };
      }
    }

    // Title ending with a lone page number (single space)
    m = raw.match(/^(.+?)\s+(\d{1,4})\s*$/);
    if (m) {
      var title2 = cleanTitle(m[1]);
      var page2 = parseInt(m[2], 10);
      // Avoid "Chapter 1" alone being parsed as title=Chapter page=1 unless looks like TOC
      var hasLeaderish = /[\.·•⋯…]{2,}/.test(raw) || /\s{3,}\d+\s*$/.test(text);
      var looksNumbered =
        /^(part|chapter|appendix|section)\b/i.test(title2) ||
        /^\d+(\.\d+)+\b/.test(title2) ||
        hasLeaderish;
      if (looksNumbered && !isNoiseTitle(title2) && page2 >= 1 && title2.length >= 3) {
        return { title: title2, page: page2 };
      }
    }

    return null;
  }

  /**
   * Merge wrapped TOC lines: title on one line, leaders/page on the next.
   */
  function coalesceTocLines(lines) {
    var out = [];
    for (var i = 0; i < lines.length; i++) {
      var cur = lines[i];
      var next = lines[i + 1];
      var text = cur.text;
      var pageOnly = next && /^\s*(?:[\.·•⋯…\s]{2,})?\d{1,4}\s*$/.test(next.text);
      var parsedAlone = parseTocEntryLine(text);

      if (!parsedAlone && next && pageOnly && cur.page === next.page) {
        var merged = text + ' ' + next.text;
        if (parseTocEntryLine(merged)) {
          out.push({
            page: cur.page,
            x: cur.x,
            y: cur.y,
            fontSize: cur.fontSize,
            text: merged,
          });
          i += 1;
          continue;
        }
      }
      out.push(cur);
    }
    return out;
  }

  function findContentsStartPage(lines, pageCount) {
    var scanLimit = Math.min(pageCount, Math.max(20, Math.ceil(pageCount * 0.2)));
    var best = null;

    for (var p = 1; p <= scanLimit; p++) {
      var pageLines = lines.filter(function (ln) {
        return ln.page === p;
      });
      var hasHeading = pageLines.some(function (ln) {
        return TOC_HEADING_RE.test(ln.text.trim());
      });
      var entryCount = 0;
      coalesceTocLines(pageLines).forEach(function (ln) {
        if (parseTocEntryLine(ln.text)) entryCount += 1;
      });

      // Heading on this page, entries may start here or on the next page
      if (hasHeading) {
        var nextCount = 0;
        if (p + 1 <= pageCount) {
          coalesceTocLines(
            lines.filter(function (ln) {
              return ln.page === p + 1;
            })
          ).forEach(function (ln) {
            if (parseTocEntryLine(ln.text)) nextCount += 1;
          });
        }
        if (entryCount + nextCount >= 2) return p;
      }

      if (entryCount >= 5 && (best == null || entryCount > best.count)) {
        best = { page: p, count: entryCount };
      }
    }
    return best ? best.page : null;
  }

  function collectContentsPageRange(lines, startPage, pageCount) {
    var pages = [];
    var emptyStreak = 0;
    var maxPages = Math.min(pageCount, startPage + 24);

    for (var p = startPage; p <= maxPages; p++) {
      var pageLines = lines.filter(function (ln) {
        return ln.page === p;
      });
      var hitStop = pageLines.some(function (ln) {
        var t = ln.text.trim();
        return TOC_STOP_HEADING_RE.test(t) && p > startPage;
      });
      if (hitStop && pages.length) break;

      var coalesced = coalesceTocLines(pageLines);
      var entries = 0;
      coalesced.forEach(function (ln) {
        if (parseTocEntryLine(ln.text)) entries += 1;
      });

      // Keep the Contents heading page even if sparse
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

    var xs = [];
    var rows = [];
    var seen = {};

    block.forEach(function (ln) {
      if (TOC_HEADING_RE.test(ln.text.trim())) return;
      var entry = parseTocEntryLine(ln.text);
      if (!entry) return;
      var key = entry.title.toLowerCase() + '|' + entry.page;
      if (seen[key]) return;
      seen[key] = true;
      xs.push(ln.x);
      rows.push({
        title: entry.title,
        page: entry.page,
        x: ln.x,
      });
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

  /**
   * Fallback: scan body for English numbered headings (Chapter / 1.2 / Appendix).
   * Page numbers here are PDF page indices (1-based).
   */
  function detectNumberedHeadings(lines) {
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

    var patterns = [
      /^(part|book)\s+([IVXLCDM\d]+)(?:\s*[:.\-–—]\s*|\s+)(.{0,120})$/i,
      /^(chapter)\s+([IVXLCDM\d]+)(?:\s*[:.\-–—]\s*|\s+)(.{0,120})$/i,
      /^(appendix|annex)\s+([A-Z]|\d+)(?:\s*[:.\-–—]\s*|\s*)(.{0,120})$/i,
      /^(section)\s+(\d+(?:\.\d+)*)(?:\s*[:.\-–—]\s*|\s+)(.{0,120})$/i,
      /^(\d+\.\d+(?:\.\d+){0,3})\s+([A-Z“"'(].{1,120})$/,
      /^(\d+)\s+([A-Z“"'(][^.]{2,80})$/,
    ];

    var rows = [];
    var lastKey = '';

    lines.forEach(function (ln) {
      var t = ln.text.trim();
      if (t.length < 3 || t.length > 140) return;
      if (repeating[t.toLowerCase()]) return;
      if (parseTocEntryLine(t)) return; // skip leftover TOC-looking lines in body

      for (var i = 0; i < patterns.length; i++) {
        var m = t.match(patterns[i]);
        if (!m) continue;

        var title = cleanTitle(t);
        if (isNoiseTitle(title)) return;

        // Plain "1 Something" is noisy — require uppercase start already in regex;
        // also skip very long paragraph-like lines
        if (i === patterns.length - 1 && t.length > 90) return;

        var level = inferLevelFromTitle(title);
        var key = ln.page + '|' + title.toLowerCase();
        if (key === lastKey) return;
        lastKey = key;
        rows.push({ title: title, level: level, page: ln.page });
        return;
      }
    });

    if (rows.length > 400) rows = rows.slice(0, 400);
    return rows;
  }

  /**
   * Primary: English Contents page parse.
   * Fallback: numbered heading scan in body.
   */
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

    var numbered = detectNumberedHeadings(lines);
    if (numbered.length) {
      return {
        rows: numbered,
        method: 'numbering',
        detail: '未可靠解析 Contents，已按 Chapter / 1.2 等编号模式从正文识别；表格页码为 PDF 页码',
      };
    }

    return {
      rows: [],
      method: 'none',
      detail: '未找到 Contents 页，也未识别到编号标题',
    };
  }

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
          '已生成目录草稿 ' + state.rows.length + ' 条。' + (detected.detail || '') + '。请微调后生成书签。',
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

      // Prefer showing bookmarks panel when opened
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
      setStatus('已下载带书签的 PDF（' + adjusted.length + ' 条目录）。请在阅读器中打开左侧书签面板查看。', 'ok');
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

    setStatus('请上传可编辑 PDF。将优先解析英文 Contents，其次按编号标题识别。文件仅在本地处理。');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
