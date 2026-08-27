import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import HeroSlider from "@/components/home/HeroSlider";
import HomeNews from "@/components/home/HomeNews";
import HomeEffects from "@/components/home/HomeEffects";
import SectionHead from "@/components/home/SectionHead";

const HERO_IMAGES = [
  "/images/mainimg06.jpg",
  "/images/mainimg04.jpg",
  "/images/mainimg05.jpg",
  "/images/mainimg02.jpg",
  "/images/mainimg03.jpg",
];

// `nav.*` gives the title and `home.card*` the description; `en` is the
// decorative kicker
const SECTION_CARDS = [
  { href: "/staff", img: "/images/mainimg06.jpg", key: "staff", en: "Staff" },
  { href: "/clinic", img: "/images/clinic/01.jpg", key: "clinic", en: "Clinic" },
  { href: "/research", img: "/images/research/01.jpg", key: "research", en: "Research" },
  { href: "/education", img: "/images/mainimg05.jpg", key: "education", en: "Education" },
  { href: "/recruit", img: "/images/mainimg02.jpg", key: "recruit", en: "Recruit" },
  { href: "/history", img: "/images/mainimg03.jpg", key: "history", en: "History" },
] as const;

const RELATED_LINKS = [
  {
    href: "http://www.tokushima-hosp.jp/",
    external: true,
    key: "linkHospital",
    en: "Tokushima University Hospital",
  },
  {
    href: "/allergy",
    external: false,
    key: "linkAllergy",
    en: "Dental Metal Allergy Clinic",
  },
  {
    href: "http://www.tokushima-u.ac.jp/dent/",
    external: true,
    key: "linkDentistry",
    en: "Faculty of Dentistry, Tokushima University",
  },
] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");

  return (
    <main className="hm-main">
      <HeroSlider
        slides={HERO_IMAGES.map((src) => ({ src, alt: t("brand.main") }))}
      />

      {/* ── Greeting ─────────────────────────────────────────── */}
      <section className="hm-section">
        <div className="hm-container hm-greeting-grid">
          <div className="hm-greeting-photo" data-reveal>
            <Image
              src="/images/matuka.jpg"
              alt={t("home.greetingPhotoAlt")}
              width={300}
              height={300}
            />
          </div>
          <div className="hm-greeting-body">
            <SectionHead en="Greeting" title={t("home.greetingTitle")} />
            <p className="hm-greeting-text" data-reveal>
              {t("home.greetingText")}
            </p>
            <p className="hm-greeting-sign" data-reveal>
              <span>{t("home.greetingRole")}</span>
              {t("home.greetingName")}
            </p>
          </div>
        </div>
      </section>

      {/* ── News ─────────────────────────────────────────────── */}
      <section className="hm-section hm-news" id="news">
        <div className="hm-container">
          <SectionHead en="News" title={t("home.newsTitle")} />
          <HomeNews />
          <div className="hm-news-more" data-reveal>
            <Link href="/topics" className="hm-btn">
              {t("home.newsMore")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Department sections ──────────────────────────────── */}
      <section className="hm-section hm-dept">
        <div className="hm-container">
          <SectionHead en="Department" title={t("home.deptTitle")} />
          <div className="hm-card-grid" data-reveal-group>
            {SECTION_CARDS.map(({ href, img, key, en }) => {
              const title = t(`nav.${key}`);
              return (
                <Link href={href} className="hm-card" key={href} data-reveal-item>
                  <div className="hm-card-img">
                    <Image src={img} alt={title} fill sizes="(max-width: 720px) 100vw, 33vw" />
                  </div>
                  <div className="hm-card-body">
                    {title !== en && <p className="hm-card-en">{en}</p>}
                    <h3 className="hm-card-title">{title}</h3>
                    <p className="hm-card-desc">
                      {t(`home.card${key[0].toUpperCase()}${key.slice(1)}`)}
                    </p>
                    <span className="hm-card-arrow" aria-hidden="true">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Related links ─────────────────────────────────────── */}
      <section className="hm-section hm-links">
        <div className="hm-container">
          <SectionHead en="Links" title={t("home.linksTitle")} />
          <ul className="hm-links-grid" data-reveal-group>
            {RELATED_LINKS.map(({ href, external, key, en }) => {
              const label = t(`home.${key}`);
              const inner = (
                <>
                  <span className="hm-link-jp">{label}</span>
                  {label !== en && <span className="hm-link-en">{en}</span>}
                  <span className="hm-link-mark" aria-hidden="true">
                    {external ? "↗" : "→"}
                  </span>
                </>
              );
              return (
                <li key={href} data-reveal-item>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hm-link-card">
                      {inner}
                    </a>
                  ) : (
                    <Link href={href} className="hm-link-card">
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* must live inside the page segment: if mounted from the layout, its
          GSAP writes race the page's hydration and React discards the styled
          DOM (hydration mismatch) */}
      <HomeEffects />
    </main>
  );
}
