interface SectionHeadProps {
  /** decorative English kicker above the title, e.g. "Greeting" */
  en: string;
  /** localised section title */
  title: string;
}

/**
 * Section heading used across the department pages.
 *
 * Same rule as PageHero: the English kicker exists to sit above a Japanese
 * title, so it is dropped in English where it would only repeat the title.
 */
export default function SectionHead({ en, title }: SectionHeadProps) {
  return (
    <div className="hm-section-head" data-reveal>
      {en !== title && <p className="hm-section-en">{en}</p>}
      <h2 className="hm-section-title">{title}</h2>
    </div>
  );
}
