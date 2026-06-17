import Image from "next/image";
import Link from "next/link";

export interface FeatureImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface FeatureSection {
  /** anchor id, kept from the legacy pages for link compat */
  id: string;
  title: string;
  en: string;
  images: FeatureImage[];
  paragraphs: string[];
  link?: { href: string; label: string };
}

/**
 * Numbered text/image sections that alternate sides on desktop.
 * Used by the clinic and research pages.
 */
export default function FeatureSections({ sections }: { sections: FeatureSection[] }) {
  return (
    <div className="hm-container hm-feat-body">
      {sections.map(({ id, title, en, images, paragraphs, link }, i) => (
        <section
          className={`hm-feat-section${i % 2 === 1 ? " is-flip" : ""}`}
          id={id}
          key={id}
          data-reveal
        >
          <div className="hm-feat-grid">
            <div className="hm-feat-text">
              <p className="hm-feat-no">{String(i + 1).padStart(2, "0")}</p>
              <header className="hm-heading-sm">
                <h2>{title}</h2>
                <span className="hm-heading-sm-en">{en}</span>
              </header>
              {paragraphs.map((p) => (
                <p className="hm-feat-p" key={p}>
                  {p}
                </p>
              ))}
              {link && (
                <Link href={link.href} className="hm-btn hm-btn-sm">
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
            <div className="hm-feat-images" data-count={images.length}>
              {images.map((img) => (
                <figure key={img.src}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 860px) 92vw, 460px"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
