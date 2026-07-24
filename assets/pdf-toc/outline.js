/**
 * Write PDF outline/bookmarks via pdf-lib / @cantoo/pdf-lib low-level API.
 * Adapted from marp-cli's setOutline helper.
 *
 * Outline item shape:
 *   { title, to: pageIndex0Based, italic?, bold? }
 *   { title, to?, children: [...], open: true }
 */
(function (global) {
  function walk(outlines, callback) {
    for (var i = 0; i < outlines.length; i++) {
      var outline = outlines[i];
      var ret = callback(outline);
      if (outline.children && outline.children.length && ret !== false) {
        walk(outline.children, callback);
      }
    }
  }

  function flatten(outlines) {
    var result = [];
    walk(outlines, function (outline) {
      result.push(outline);
    });
    return result;
  }

  function getOpeningCount(outlines) {
    var count = 0;
    walk(outlines, function (outline) {
      count += 1;
      return !(outline.open === false);
    });
    return count;
  }

  /**
   * @param {import('@cantoo/pdf-lib').PDFDocument} doc
   * @param {Array} outlines
   * @param {typeof PDFLib} PDFLib
   */
  function setOutline(doc, outlines, PDFLib) {
    var PDFHexString = PDFLib.PDFHexString;
    var rootRef = doc.context.nextRef();
    var refMap = new WeakMap();
    var flat = flatten(outlines);

    for (var i = 0; i < flat.length; i++) {
      refMap.set(flat[i], doc.context.nextRef());
    }

    var pageRefs = [];
    doc.catalog.Pages().traverse(function (kid, ref) {
      if (kid.get(kid.context.obj('Type')) && kid.get(kid.context.obj('Type')).toString() === '/Page') {
        pageRefs.push(ref);
      }
    });

    function createOutline(items, parent) {
      var length = items.length;
      for (var i = 0; i < length; i++) {
        var outline = items[i];
        var outlineRef = refMap.get(outline);
        var destOrAction = {};

        if (typeof outline.to === 'number') {
          var pageRef = pageRefs[outline.to];
          if (pageRef) {
            destOrAction = { Dest: [pageRef, 'Fit'] };
          }
        } else if (Array.isArray(outline.to)) {
          var pageIndex = outline.to[0];
          var page = doc.getPage(pageIndex);
          var width = page.getWidth();
          var height = page.getHeight();
          destOrAction = {
            Dest: [
              pageRefs[pageIndex],
              'XYZ',
              width * outline.to[1],
              height * outline.to[2],
              null,
            ],
          };
        }

        var childrenDict = {};
        if (outline.children && outline.children.length > 0) {
          createOutline(outline.children, outlineRef);
          childrenDict = {
            First: refMap.get(outline.children[0]),
            Last: refMap.get(outline.children[outline.children.length - 1]),
            Count: getOpeningCount(outline.children) * (outline.open === false ? -1 : 1),
          };
        }

        var dict = {
          Title: PDFHexString.fromText(outline.title || ''),
          Parent: parent,
          F: (outline.italic ? 1 : 0) | (outline.bold ? 2 : 0),
        };
        if (i > 0) dict.Prev = refMap.get(items[i - 1]);
        if (i < length - 1) dict.Next = refMap.get(items[i + 1]);
        Object.assign(dict, childrenDict, destOrAction);

        doc.context.assign(outlineRef, doc.context.obj(dict));
      }
    }

    createOutline(outlines, rootRef);

    var rootCount = getOpeningCount(outlines);
    var rootDict = {
      Type: 'Outlines',
      Count: rootCount,
    };
    if (rootCount > 0 && outlines.length > 0) {
      rootDict.First = refMap.get(outlines[0]);
      rootDict.Last = refMap.get(outlines[outlines.length - 1]);
    }

    doc.context.assign(rootRef, doc.context.obj(rootDict));
    doc.catalog.set(doc.context.obj('Outlines'), rootRef);
  }

  /**
   * Convert flat TOC rows [{title, level, page}] into nested outline tree.
   * page is 1-based PDF page number; outline.to uses 0-based index.
   */
  function buildNestedOutlines(rows) {
    var root = [];
    var stack = []; // { level, node }

    rows.forEach(function (row) {
      if (!row.title || !String(row.title).trim()) return;
      var level = Math.max(1, Math.min(3, parseInt(row.level, 10) || 1));
      var page1 = parseInt(row.page, 10);
      if (!Number.isFinite(page1) || page1 < 1) return;

      var node = {
        title: String(row.title).trim(),
        to: page1 - 1,
        open: true,
        children: [],
      };

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (!stack.length) {
        root.push(node);
      } else {
        stack[stack.length - 1].node.children.push(node);
      }
      stack.push({ level: level, node: node });
    });

    // Drop empty children arrays for leaf nodes (cleaner Dest-only items)
    function prune(nodes) {
      return nodes.map(function (n) {
        if (n.children && n.children.length) {
          return {
            title: n.title,
            to: n.to,
            open: true,
            children: prune(n.children),
          };
        }
        return { title: n.title, to: n.to };
      });
    }

    return prune(root);
  }

  global.PdfTocOutline = {
    setOutline: setOutline,
    buildNestedOutlines: buildNestedOutlines,
  };
})(typeof window !== 'undefined' ? window : this);
