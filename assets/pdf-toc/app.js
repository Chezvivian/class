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

  /**
   * Heuristic: body size = mode of rounded font sizes among mid-length lines.
   * Heading candidates: larger than body * threshold, short-ish lines, not repeating headers.
   */
  function detectHeadings(lines) {
    if (!lines.length) return [];

    var sizes = lines
      .filter(function (ln) {
        return ln.text.length >= 4 && ln.text.length <= 120;
      })
      .map(function (ln) {
        return Math.round(ln.fontSize * 10) / 10;
      });

    if (!sizes.length) {
      sizes = lines.map(function (ln) {
        return Math.round(ln.fontSize * 10) / 10;
      });
    }

    var freq = {};
    sizes.forEach(function (s) {
      freq[s] = (freq[s] || 0) + 1;
    });
    var bodySize = sizes[0];
    var bestCount = 0;
    Object.keys(freq).forEach(function (k) {
      if (freq[k] > bestCount) {
        bestCount = freq[k];
        bodySize = parseFloat(k);
      }
    });

    // Filter likely running headers/footers: same text on many pages
    var textPageCount = {};
    lines.forEach(function (ln) {
      var key = ln.text.toLowerCase();
      if (!textPageCount[key]) textPageCount[key] = {};
      textPageCount[key][ln.page] = true;
    });
    var repeating = {};
    Object.keys(textPageCount).forEach(function (key) {
      if (Object.keys(textPageCount[key]).length >= 3) repeating[key] = true;
    });

    var candidates = lines.filter(function (ln) {
      var t = ln.text;
      if (t.length < 2 || t.length > 140) return false;
      if (repeating[t.toLowerCase()]) return false;
      // Skip pure page numbers / dotted leaders
      if (/^[\d\sivxlcdm.·•\-–—]+$/i.test(t)) return false;
      if (/^\.{3,}/.test(t) || /\.{3,}\s*\d+$/.test(t)) return false;
      // Must be noticeably larger than body
      if (ln.fontSize < bodySize * 1.12) return false;
      return true;
    });

    // Unique heading sizes (desc), map to levels 1..3
    var headingSizes = candidates
      .map(function (c) {
        return Math.round(c.fontSize * 10) / 10;
      })
      .filter(function (v, i, arr) {
        return arr.indexOf(v) === i;
      })
      .sort(function (a, b) {
        return b - a;
      });

    var sizeToLevel = {};
    if (headingSizes.length === 1) {
      sizeToLevel[headingSizes[0]] = 1;
    } else if (headingSizes.length === 2) {
      sizeToLevel[headingSizes[0]] = 1;
      sizeToLevel[headingSizes[1]] = 2;
    } else {
      // Cluster into 3 buckets by rank thirds
      headingSizes.forEach(function (s, idx) {
        var ratio = idx / Math.max(1, headingSizes.length - 1);
        sizeToLevel[s] = ratio < 0.34 ? 1 : ratio < 0.67 ? 2 : 3;
      });
    }

    // Dedupe consecutive identical titles on same page
    var rows = [];
    var lastKey = '';
    candidates.forEach(function (c) {
      var rounded = Math.round(c.fontSize * 10) / 10;
      var level = sizeToLevel[rounded] || 2;
      var key = c.page + '|' + c.text.toLowerCase();
      if (key === lastKey) return;
      lastKey = key;
      rows.push({
        title: c.text,
        level: level,
        page: c.page,
        fontSize: rounded,
      });
    });

    // Cap runaway drafts
    if (rows.length > 400) {
      rows = rows.slice(0, 400);
    }

    return { rows: rows, bodySize: bodySize };
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
      setProgress(true, 85, '正在推断标题…');
      var detected = detectHeadings(result.lines);
      state.rows = detected.rows;
      renderTable();
      setProgress(true, 100, '完成');
      setTimeout(function () {
        setProgress(false);
      }, 400);

      if (!state.rows.length) {
        setStatus('未自动识别到标题。可点击「添加一行」手动填写后生成书签。', 'error');
      } else {
        setStatus(
          '已生成目录草稿 ' +
            state.rows.length +
            ' 条（正文参考字号 ≈ ' +
            detected.bodySize +
            '）。请微调后生成书签。',
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

    setStatus('请上传可编辑 PDF（文字可选中）。文件仅在浏览器本地处理，不会上传到服务器。');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
