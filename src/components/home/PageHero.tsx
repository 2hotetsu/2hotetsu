interface PageHeroProps {
  /** small English label above the title, e.g. "Staff" */
  en: string;
  /** Japanese page title, e.g. "スタッフ" */
  title: string;
  /** optional one-line description under the title */
  description?: string;
}

/**
 * Compact navy banner used as the page header on sub-pages.
 * Dark by design so the fixed transparent site header stays readable.
 */
export default function PageHero({ en, title, description }: PageHeroProps) {
  return (
    <section className="hm-page-hero">
      <div className="hm-container">
        <p className="hm-page-hero-en">{en}</p>
        <h1 className="hm-page-hero-title">{title}</h1>
        {description && <p className="hm-page-hero-desc">{description}</p>}
      </div>
    </section>
  );
}
