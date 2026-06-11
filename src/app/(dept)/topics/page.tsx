import { getPageContent } from "@/lib/dept/getPageContent";
import { getDeptNews, getMonthAnchor, getMonthLabel, type DeptNewsEntry } from "@/lib/dept/getDeptNews";

export const metadata = { title: "トピックス | 顎機能咬合再建学分野" };

interface MonthGroup {
  anchor: string;
  label: string;
  entries: DeptNewsEntry[];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function groupByMonth(entries: DeptNewsEntry[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const entry of entries) {
    const anchor = getMonthAnchor(entry.date);
    const last = groups[groups.length - 1];
    if (last && last.anchor === anchor) {
      last.entries.push(entry);
    } else {
      groups.push({ anchor, label: getMonthLabel(entry.date), entries: [entry] });
    }
  }
  return groups;
}

function renderEntryRows(entry: DeptNewsEntry): string {
  const text = escapeHtml(entry.body).replace(/\n/g, "<br>\n");

  let html = "";
  if (entry.images.length > 0) {
    const cells = [0, 1].map((i) => {
      const img = entry.images[i];
      if (!img) return "<th></th>";
      const alt = img.alt ? escapeHtml(img.alt) : "";
      return `<th><img src="${img.url}" alt="${alt}" width="340"></th>`;
    });
    html += `  <tr>\n    ${cells.join("\n    ")}\n  </tr>\n`;
  }

  html += `  <tr>\n    <td colspan="2">\n      ${text}\n    </td>\n  </tr>\n`;
  return html;
}

// Render the latest Sanity-managed entries grouped by year/month, in the
// same .topics_t table markup used by the legacy topics.html sections.
function renderNewsSection(groups: MonthGroup[]): string {
  let html = "";
  for (const group of groups) {
    html += `<h3 id="${group.anchor}">${group.label}</h3>\n<table class="topics_t marB20">\n`;
    for (const entry of group.entries) {
      html += renderEntryRows(entry);
    }
    html += "</table>\n\n";
  }
  return html;
}

// Render matching <li> entries for the left-hand month list (#smenu)
function renderSidebarLinks(groups: MonthGroup[]): string {
  return groups.map((g) => `<li><a href="#${g.anchor}">${g.label}</a></li>\n`).join("");
}

export default async function Topics() {
  const html = getPageContent("topics");
  const entries = await getDeptNews(10);
  const groups = groupByMonth(entries);

  if (groups.length === 0) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  let finalHtml = html;

  // Add sidebar links for the new months at the top of the month list
  const smenuMarker = '<ul class="smenu">';
  const smenuIdx = finalHtml.indexOf(smenuMarker) + smenuMarker.length;
  finalHtml = `${finalHtml.slice(0, smenuIdx)}\n${renderSidebarLinks(groups)}${finalHtml.slice(smenuIdx)}`;

  // Insert the new entries right after the page heading, ahead of the legacy sections
  const h2Marker = "</h2>";
  const h2Idx = finalHtml.indexOf(h2Marker) + h2Marker.length;
  finalHtml = `${finalHtml.slice(0, h2Idx)}\n\n${renderNewsSection(groups)}${finalHtml.slice(h2Idx)}`;

  return <div dangerouslySetInnerHTML={{ __html: finalHtml }} />;
}
