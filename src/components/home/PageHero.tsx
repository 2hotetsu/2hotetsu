interface PageHeroProps {
  /** small English label above the title, e.g. "Staff" */
  en: string;
  /** localised page title — "スタッフ" in Japanese, "Staff" in English */
  title: string;
  /** optional one-line description under the title */
  description?: string;
}

/**
 * Compact navy banner used as the page header on sub-pages.
 * Dark by design so the fixed transparent site header stays readable.
 *
 * The small English line is decoration over a Japanese title; in English it
 * would just repeat the title, so it is dropped whenever the two match.
 */
export default function PageHero({ en, title, description }: PageHeroProps) {
  return (
    <section className="hm-page-hero">
      <div className="hm-container">
        {en !== title && <p className="hm-page-hero-en">{en}</p>}
        <h1 className="hm-page-hero-title">{title}</h1>
        {description && <p className="hm-page-hero-desc">{description}</p>}
      </div>
    </section>
  );
}
