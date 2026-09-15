"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide motion for the home layout:
 * - Lenis smooth scrolling driven by the GSAP ticker
 * - scroll-reveal for [data-reveal] elements
 * - staggered reveal for children of [data-reveal-group]
 */
export default function HomeEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: parseFloat(el.dataset.revealDelay ?? "0"),
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          }
        );
      });
    });

    // anchor links (e.g. the footer page-top button) scroll via Lenis
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href")!);
      if (!target) return;
      e.preventDefault();
      // fixed-header clearance comes from each target's scroll-margin-top,
      // which Lenis honours
      lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    // The handler above only covers same-page anchors. A link from another page
    // (/topics#june26) is scrolled by the router instead, and that lands exactly
    // while this effect is mounting: Lenis is taking the scroll over and
    // ScrollTrigger is refreshing, each with its own idea of where the page is.
    // Whoever wins decides where you stop, which is why the landing is right
    // some of the time and too far down the rest. Re-assert the target while the
    // layout settles, and stop the moment the visitor scrolls for themselves.
    const settleEvents = ["wheel", "touchstart", "keydown"] as const;
    let hashTarget: HTMLElement | null = null;
    try {
      hashTarget =
        window.location.hash.length > 1
          ? document.querySelector<HTMLElement>(window.location.hash)
          : null;
    } catch {
      hashTarget = null; // hash that is not a valid selector
    }

    const stopSettling = () => {
      hashTarget = null;
    };
    const settle = () => {
      if (!hashTarget) return;
      // scroll-margin-top on the target supplies the fixed-header clearance
      lenis.scrollTo(hashTarget, { immediate: true, force: true });
    };

    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    if (hashTarget) {
      settleEvents.forEach((event) =>
        window.addEventListener(event, stopSettling, { once: true, passive: true })
      );
      settle();
      settleTimer = setTimeout(settle, 250);
      window.addEventListener("load", settle);
    }

    return () => {
      stopSettling();
      if (settleTimer) clearTimeout(settleTimer);
      window.removeEventListener("load", settle);
      settleEvents.forEach((event) => window.removeEventListener(event, stopSettling));
      document.removeEventListener("click", onAnchorClick);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
