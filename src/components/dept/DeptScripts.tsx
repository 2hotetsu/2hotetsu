'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Only load the dependencies — NOT function.js, because its $(function(){})
// fires immediately on script eval and may miss the React-rendered DOM.
const SCRIPTS = [
  '/js-dept/jquery.hoverIntent.minified.js',
  '/js-dept/jquery.easing.1.3.js',
  '/js-dept/diapo.min.js',
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // avoid double-loading
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JQueryStatic = any;

export default function DeptScripts() {
  const pathname = usePathname();

  useEffect(() => {
    let destroyed = false;

    (async () => {
      try {
        for (const src of SCRIPTS) {
          await loadScript(src);
        }

        if (destroyed) return;

        const $ = (window as unknown as { jQuery: JQueryStatic }).jQuery;
        if (!$) return;

        // ── Diapo slideshow (home page only) ──────────────────────────────
        const diapo = $('.pix_diapo');
        if (diapo.length > 0 && typeof $.fn.diapo === 'function') {
          // Clean any previous diapo artifacts (HMR / navigation)
          diapo.find('.diapoappended').remove();
          $('#pix_pag').remove();
          diapo.children('div')
            .removeAttr('style')
            .removeClass('diapocurrent diapostarted');
          diapo.removeClass('diaposliding diapostarted stopped');

          // Force a pixel height before diapo reads elem.height(), because on mobile
          // the container uses height:auto + aspect-ratio and some jQuery versions
          // return 0 for that. getBoundingClientRect is always accurate after layout.
          const diapoEl = diapo[0] as HTMLElement;
          const computedH = diapoEl.getBoundingClientRect().height;
          if (computedH > 0) {
            diapo.css('height', computedH + 'px');
          }

          diapo.diapo({
            fx: 'random,simpleFade',
            // diapo.js sets clickEv='tap' on mobile but jQuery has no .tap() without
            // jQuery Mobile — disabling these avoids the TypeError that kills init.
            pauseOnClick: false,
            navigation: false,
            mobileNavigation: false,
            commands: false,
            mobileCommands: false,
            pagination: false,
            mobilePagination: false,
            thumbs: false,
            loader: 'none',
            gridDifference: 100,
            transPeriod: 3000,
            time: 800,
          });
        }

        // ── Nav image hover ───────────────────────────────────────────────
        const postfix = '_ov';
        $('#nav a img')
          .not('[src*="' + postfix + '."]')
          .each(function (this: HTMLElement) {
            const img = $(this);
            const src = img.attr('src')!;
            const src_on =
              src.substr(0, src.lastIndexOf('.')) +
              postfix +
              src.substring(src.lastIndexOf('.'));
            $('<img>').attr('src', src_on);
            img.off('mouseenter mouseleave').hover(
              function () { img.attr('src', src_on); },
              function () { img.attr('src', src); }
            );
          });

        // ── Smooth scroll (anchor-only links) ────────────────────────────
        // Remove any previously bound handler first to avoid stacking
        $('.pagetop a, .smenu li a').off('click.dept');
        $('.pagetop a, .smenu li a').on('click.dept', function (this: HTMLElement, e: Event) {
          const href = $(this as HTMLElement).attr('href') ?? '';
          // Only intercept pure hash links (e.g. "#top"), not page links
          if (!href.startsWith('#')) return;
          e.preventDefault();
          const target = href === '#' ? $('html') : $(href);
          if (target.length) {
            $('html, body').animate({ scrollTop: target.offset()!.top }, 900, 'swing');
          }
        });

        // ── Sticky sub-nav ────────────────────────────────────────────────
        $(window).off('scroll.dept');
        const nav = $('.smenu');
        if (nav.length) {
          const offsetTop = nav.offset()!.top;
          $(window).on('scroll.dept', function () {
            if ($(window).scrollTop()! > offsetTop - 20) {
              nav.addClass('fixed');
            } else {
              nav.removeClass('fixed');
            }
          });
        }
      } catch (err) {
        console.warn('DeptScripts initialization failed:', err);
      }
    })();

    return () => {
      destroyed = true;
      const win = window as unknown as { jQuery?: JQueryStatic };
      if (win.jQuery) {
        const $ = win.jQuery;
        $(window).off('scroll.dept');
        $('.pagetop a, .smenu li a').off('click.dept');
      }
    };
  // Re-run every time the route changes so handlers and diapo reinitialize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
