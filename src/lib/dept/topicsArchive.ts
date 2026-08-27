import archive from "@/data/dept/topics-archive.json";

// Frozen archive converted from the legacy topics.html
// (see scripts/convert-topics.mjs). New entries are managed in Sanity.

export interface ArchiveImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArchiveEntry {
  images: ArchiveImage[];
  /** sanitised: plain text plus <br> and <a href target rel> only */
  html: string;
}

export interface ArchiveSection {
  /** legacy anchor id, e.g. "topics94" — preserved for inbound links */
  anchor: string;
  /** e.g. "2026年4月" (rarely "2017年9月・10月") */
  label: string;
  entries: ArchiveEntry[];
}

export const TOPICS_ARCHIVE = archive as ArchiveSection[];

const MONTH_RE = /(\d{4})年(\d{1,2})月/;

/** "2026年4月" → 2026 (first year mentioned) */
export function sectionYear(label: string): number | null {
  const m = label.match(MONTH_RE);
  return m ? parseInt(m[1], 10) : null;
}

/** "2026年4月" → "2026-04-01" */
export function sectionDate(label: string): string | null {
  const m = label.match(MONTH_RE);
  return m ? `${m[1]}-${m[2].padStart(2, "0")}-01` : null;
}

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Archive labels are Japanese and were frozen when the old page was converted:
 * "2026年4月", occasionally "2017年9月・10月". In English each "YYYY年M月"
 * becomes "Month YYYY" and the "・" separator becomes " / ".
 */
export function localizeSectionLabel(label: string, locale: string): string {
  if (locale !== "en") return label;

  const year = label.match(MONTH_RE)?.[1];
  if (!year) return label;

  const months = [...label.matchAll(/(\d{1,2})月/g)].map(
    (m) => MONTHS_EN[parseInt(m[1], 10) - 1]
  );
  return months.length ? `${months.join(" / ")} ${year}` : label;
}
