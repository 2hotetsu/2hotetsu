"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";

const SLIDE_SECONDS = 5;
const FADE_SECONDS = 1.6;

export interface HeroSlide {
  src: string;
  alt: string;
}

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("Dept");
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slideEls = gsap.utils.toArray<HTMLElement>(".hm-hero-slide", root);
    const barEls = gsap.utils.toArray<HTMLElement>(".hm-hero-bar i", root);
    let interval: ReturnType<typeof setInterval> | undefined;

    const ctx = gsap.context(() => {
      // first slide stays visible without JS; CSS hides the rest
      if (reduced) return;

      gsap.set(slideEls, { autoAlpha: 0 });
      gsap.set(slideEls[0], { autoAlpha: 1 });

      // entrance: headline lines rise, then meta/sub fade in
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .fromTo(".hm-hero-line-inner", { yPercent: 112 }, { yPercent: 0, duration: 1.3, stagger: 0.16 }, 0.35)
        .fromTo(
          ".hm-hero-meta, .hm-hero-sub",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
          0.9
        )
        .fromTo(".hm-hero-scroll, .hm-hero-bars", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.5);

      const kenBurns = (el: HTMLElement) => {
        gsap.fromTo(
          el.querySelector("img"),
          { scale: 1.02 },
          { scale: 1.1, duration: SLIDE_SECONDS + FADE_SECONDS, ease: "none" }
        );
      };

      const fillBar = (i: number) => {
        gsap.set(barEls, { scaleX: 0 });
        gsap.fromTo(barEls[i], { scaleX: 0 }, { scaleX: 1, duration: SLIDE_SECONDS, ease: "none" });
      };

      kenBurns(slideEls[0]);
      fillBar(0);

      if (slideEls.length < 2) return;

      let current = 0;
      interval = setInterval(() => {
        const next = (current + 1) % slideEls.length;
        gsap.to(slideEls[current], { autoAlpha: 0, duration: FADE_SECONDS, ease: "power1.inOut" });
        gsap.to(slideEls[next], { autoAlpha: 1, duration: FADE_SECONDS, ease: "power1.inOut" });
        kenBurns(slideEls[next]);
        fillBar(next);
        current = next;
      }, SLIDE_SECONDS * 1000);
    }, root);

    return () => {
      if (interval) clearInterval(interval);
      ctx.revert();
    };
  }, [slides.length]);

  return (
    <section className="hm-hero" ref={rootRef}>
      <div className="hm-hero-slides">
        {slides.map((slide, i) => (
          <div className="hm-hero-slide" key={slide.src}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="hm-hero-shade" />

      <div className="hm-hero-content">
        <p className="hm-hero-meta">{t("brand.sup")}</p>
        {/* <h1 className="hm-hero-title">
          <span className="hm-hero-line">
            <span className="hm-hero-line-inner">噛む機能を、科学する。</span>
          </span>
          <span className="hm-hero-line">
            <span className="hm-hero-line-inner">口腔から、健やかな未来へ。</span>
          </span>
        </h1> */}
        <p className="hm-hero-sub">
          {t("brand.main")}
          {/* decorative English line: empty in the en locale, where it would
              just repeat the name above */}
          {t("brand.en") && <span>{t("brand.en")}</span>}
        </p>
      </div>

      <div className="hm-hero-bars" aria-hidden="true">
        {slides.map((slide) => (
          <span className="hm-hero-bar" key={slide.src}>
            <i />
          </span>
        ))}
      </div>

      <div className="hm-hero-scroll" aria-hidden="true">
        <span>SCROLL</span>
        <i />
      </div>
    </section>
  );
}
