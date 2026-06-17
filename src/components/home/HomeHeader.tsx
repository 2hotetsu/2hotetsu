"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", jp: "ホーム", en: "Home" },
  { href: "/staff", jp: "スタッフ", en: "Staff" },
  { href: "/topics", jp: "トピックス", en: "Topics" },
  { href: "/clinic", jp: "診療内容", en: "Clinic" },
  { href: "/research", jp: "研究内容", en: "Research" },
  { href: "/education", jp: "教育内容", en: "Education" },
  { href: "/recruit", jp: "入局案内", en: "Recruit" },
  { href: "/history", jp: "教室沿革", en: "History" },
  { href: "/achievements", jp: "業績集", en: "Achievements" },
];

export default function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the overlay menu is open
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`hm-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
    >
      <div className="hm-header-inner">
        <Link href="/" className="hm-brand" onClick={() => setMenuOpen(false)}>
          <span className="hm-brand-sup">徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系</span>
          <span className="hm-brand-main">顎機能咬合再建学分野</span>
        </Link>

        <nav className="hm-nav" aria-label="メインナビゲーション">
          <ul>
            {NAV_ITEMS.map(({ href, jp }) => (
              <li key={href}>
                <Link href={href}>{jp}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="hm-menu-btn"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="hm-menu-overlay" aria-hidden={!menuOpen}>
        <ul>
          {NAV_ITEMS.map(({ href, jp, en }, i) => (
            <li key={href} style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.05}s` : "0s" }}>
              <Link href={href} onClick={() => setMenuOpen(false)}>
                <span className="hm-menu-jp">{jp}</span>
                <span className="hm-menu-en">{en}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="hm-menu-foot">
          徳島大学大学院医歯薬学研究部<br />顎機能咬合再建学分野
        </p>
      </div>
    </header>
  );
}
