import { TOPICS_ARCHIVE, sectionDate } from "./topicsArchive";

export interface TopicsEntry {
  id: string;       // e.g. "topics94-0"
  date: string;     // YYYY-MM-01
  text: string;     // full Japanese/English text
  anchor: string;   // "/topics#topics94"
  source: 'topics';
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

// Newest-first flat list of archive entries, used to pad the home news list.
export function getTopicsData(limit = 20): TopicsEntry[] {
  const entries: TopicsEntry[] = [];

  for (const section of TOPICS_ARCHIVE) {
    const date = sectionDate(section.label);
    if (!date) continue;

    section.entries.forEach((entry, idx) => {
      const text = stripHtml(entry.html);
      if (!text || text.length < 5) return;
      entries.push({
        id: `${section.anchor}-${idx}`,
        date,
        text,
        anchor: `/topics#${section.anchor}`,
        source: "topics",
      });
    });

    if (entries.length >= limit) break;
  }

  return entries.slice(0, limit);
}
