import { readFileSync } from 'fs';
import { join } from 'path';

export interface TopicsEntry {
  id: string;       // e.g. " topics94-0"
  date: string;     // YYYY-MM-01
  text: string;     // truncated Japanese text
  anchor: string;   // "/topics#topics94"
  source: 'topics';
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max = 80): string {
  if (text.length <= max) return text;
  // try to cut at a Japanese sentence boundary
  const cut = text.slice(0, max);
  const lastPunct = Math.max(
    cut.lastIndexOf('。'),
    cut.lastIndexOf('、'),
    cut.lastIndexOf(' '),
  );
  return (lastPunct > max * 0.6 ? cut.slice(0, lastPunct + 1) : cut) + '…';
}

export function getTopicsData(limit = 20): TopicsEntry[] {
  const filePath = join(process.cwd(), 'src', 'data', 'dept', 'topics.html');
  const html = readFileSync(filePath, 'utf-8');

  const entries: TopicsEntry[] = [];

  // Split the content section (after the sidebar) at each <h3 id="topicsXX">
  const sectionRe = /<h3[^>]*id="(topics[\w_]+)"[^>]*>(\d{4})年(\d{1,2})月[^<]*<\/h3>([\s\S]*?)(?=<h3[^>]*id="topics|<\/div><!--#page_r-->|$)/g;

  let sectionMatch: RegExpExecArray | null;
  while ((sectionMatch = sectionRe.exec(html)) !== null) {
    const anchor = sectionMatch[1];           // "topics94"
    const year   = sectionMatch[2];           // "2026"
    const month  = sectionMatch[3].padStart(2, '0'); // "04"
    const body   = sectionMatch[4];

    // Each <td colspan="2"> inside this section is one event
    const tdRe = /<td[^>]*colspan[^>]*2[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch: RegExpExecArray | null;
    let idx = 0;

    while ((tdMatch = tdRe.exec(body)) !== null) {
      const raw = stripHtml(tdMatch[1]);
      if (!raw || raw.length < 5) continue;


      const text = truncate(raw);

      entries.push({
        id: `${anchor}-${idx}`,
        date: `${year}-${month}-01`,
        text,
        anchor: `/topics#${anchor}`,
        source: 'topics',
      });
      idx++;

      if (entries.length >= limit * 3) break; // parse enough then stop
    }

    if (entries.length >= limit * 3) break;
  }

  // Already in document order (newest first), just cap
  return entries.slice(0, limit);
}
