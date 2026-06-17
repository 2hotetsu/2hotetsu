// One-time conversion of the legacy achievements.html (学術論文) and
// achievements02.html (科学研究費等) into src/data/dept/achievements-archive.json.
// Kept for reproducibility — the archive is frozen (new entries are managed
// in Sanity), so this normally never needs to run again.
//
//   node scripts/convert-achievements.mjs

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&ge;/g, "≥")
    .replace(/&le;/g, "≤")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#?\w+?;/g, (m) => (m === "&amp;" ? "&" : m))
    .replace(/&amp;/g, "&");
}

function extractItems(file) {
  const html = readFileSync(join(root, "src", "data", "dept", file), "utf8");
  const content = html.slice(html.indexOf('<div id="page_r">'));

  const items = [];
  for (const m of content.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
    if (/<a [^>]*href/.test(m[1])) {
      console.warn(`! link stripped in ${file}: ${m[1].slice(0, 80)}…`);
    }
    const text = decodeEntities(
      m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    );
    if (text) items.push(text);
  }
  return items;
}

const papers = extractItems("achievements.html");
const grants = extractItems("achievements02.html");

const outFile = join(root, "src", "data", "dept", "achievements-archive.json");
writeFileSync(outFile, JSON.stringify({ papers, grants }, null, 1) + "\n");
console.log(`${papers.length} papers, ${grants.length} grants -> ${outFile}`);
