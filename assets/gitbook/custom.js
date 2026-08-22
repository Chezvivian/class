// Enable footnote link support for pages with width < 1240.
//
function bind_footnote_links() {
    if ($(document).width() > 1240) {
        return;
    }
    let footnotes = $("div.footnotes").find("ol > li > p > a.reversefootnote");
    for (let i = 0; i < footnotes.length; i++) {
        let footnote = footnotes[i];
        footnote.addEventListener('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('href'));
            if (target.length) {
                $('div.body-inner').animate({
                    scrollTop: target.get(0).offsetTop,
                });
            }
        });
    }
}

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", bind_footnote_links);
} else {
    // `DOMContentLoaded` has already fired
    bind_footnote_links();
}

// GitBook intercepts in-page hash links and, on small screens, scrolls
// `.book-body` while the real scroller is `.body-inner` (position:absolute).
document.addEventListener('click', function (e) {
    var link = e.target && e.target.closest && e.target.closest('.mp-page-toc a[href^="#"]');
    if (!link) return;
    var id = decodeURIComponent((link.getAttribute('href') || '').replace(/^#/, ''));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    var scroller = document.querySelector('.body-inner') || document.querySelector('.book-body');
    if (scroller) {
        var top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 8;
        if (typeof scroller.scrollTo === 'function') {
            scroller.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        } else {
            scroller.scrollTop = Math.max(0, top);
        }
    } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (history.replaceState) {
        history.replaceState(null, '', '#' + id);
    }
}, true);


