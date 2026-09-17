import { getPageContent } from "@/lib/dept/getPageContent";
import { getAchievements } from "@/lib/dept/getAchievements";

export const metadata = { title: "業績集 | 顎機能咬合再建学分野" };

// The legacy markup holds the 学術論文 citations in a single <ul class="list">.
// New publications come from the Studio and are spliced in at the top of that
// list, so the archive file stays frozen and nobody has to edit HTML to publish.
const PAPERS_LIST = '<ul class="list">';

const URL_RE = /(https?:\/\/[^\s　<]+)/g;

/** Sanity stores plain text, and this lands inside dangerouslySetInnerHTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toListItem(text: string): string {
  // linkify after escaping, matching the anchors the legacy citations already use
  const body = escapeHtml(text).replace(
    URL_RE,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
  return `    <li>${body}</li>`;
}

export default async function Achievements() {
  const html = getPageContent("achievements");
  const entries = await getAchievements();

  let content = html;
  if (entries.length > 0) {
    const items = entries.map((entry) => toListItem(entry.title)).join("\n");
    content = html.includes(PAPERS_LIST)
      ? // a function replacement, so $ in a citation is not read as a pattern
        html.replace(PAPERS_LIST, () => `${PAPERS_LIST}\n${items}`)
      : // the archive was restructured: show the entries rather than drop them
        `<ul class="list">\n${items}\n</ul>\n${html}`;
  }

  return <div className="has-sidebar" dangerouslySetInnerHTML={{ __html: content }} />;
}
