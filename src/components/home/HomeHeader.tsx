"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/", key: "home", en: "Home" },
  { href: "/staff", key: "staff", en: "Staff" },
  { href: "/topics", key: "topics", en: "Topics" },
  { href: "/clinic", key: "clinic", en: "Clinic" },
  { href: "/research", key: "research", en: "Research" },
  { href: "/education", key: "education", en: "Education" },
  { href: "/recruit", key: "recruit", en: "Recruit" },
  { href: "/history", key: "history", en: "History" },
  { href: "/achievements", key: "achievements", en: "Achievements" },
] as const;

export default function HomeHeader() {
  const t = useTranslations("Dept");
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
          <span className="hm-brand-sup">{t("brand.sup")}</span>
          <span className="hm-brand-main">{t("brand.main")}</span>
        </Link>

        <nav className="hm-nav" aria-label={t("nav.ariaMain")}>
          <ul>
            {NAV_ITEMS.map(({ href, key }) => (
              <li key={href}>
                <Link href={href}>{t(`nav.${key}`)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hm-header-actions">
          <LanguageSwitcher className="hm-lang" />

          <button
            type="button"
            className="hm-menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="hm-menu-overlay" aria-hidden={!menuOpen}>
        <ul>
          {NAV_ITEMS.map(({ href, key, en }, i) => {
            const label = t(`nav.${key}`);
            return (
              <li key={href} style={{ transitionDelay: menuOpen ? `${0.08 + i * 0.05}s` : "0s" }}>
                <Link href={href} onClick={() => setMenuOpen(false)}>
                  <span className="hm-menu-jp">{label}</span>
                  {/* the English is decorative: dropped when it would repeat the label */}
                  {label !== en && <span className="hm-menu-en">{en}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="hm-menu-foot">
          {t("brand.sup")}
          <br />
          {t("brand.main")}
        </p>
      </div>
    </header>
  );
}
