import { client } from "@/sanity/lib/client";
import { getTopicsData, type TopicsEntry } from "@/lib/dept/getTopicsData";

interface SanityNewsItem {
  _id: string;
  date: string;
  body: string;
  link?: string;
}

interface NewsEntry {
  id: string;
  date: string;
  text: string;
  link?: string;
  source: 'sanity' | 'topics';
}

async function getSanityNews(): Promise<SanityNewsItem[]> {
  try {
    return await client.fetch(
      `*[_type == "deptNews"] | order(date desc)[0...15] {
        _id, date, body, link
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default async function DeptNews() {
  // fetch both sources in parallel
  const [sanityItems, topicsItems] = await Promise.all([
    getSanityNews(),
    Promise.resolve(getTopicsData(20)),
  ]);

  // normalise Sanity entries
  const sanityEntries: NewsEntry[] = sanityItems.map((item) => ({
    id: item._id,
    date: item.date,
    text: item.body,
    link: item.link,
    source: 'sanity',
  }));

  // normalise topics entries — only use as many as needed to reach 15 total
  const topicsEntries: NewsEntry[] = (topicsItems as TopicsEntry[]).map((item) => ({
    id: item.id,
    date: item.date,
    text: item.text,
    link: item.anchor,
    source: 'topics',
  }));

  // merge: Sanity first, then topics to fill up to 15
  const remaining = Math.max(0, 15 - sanityEntries.length);
  const combined = [...sanityEntries, ...topicsEntries.slice(0, remaining)];

  if (combined.length === 0) {
    return (
      <dl className="dept-news">
        <dt>—</dt>
        <dd>新着情報はありません。</dd>
      </dl>
    );
  }

  return (
    <dl className="dept-news">
      {combined.map((item) => (
        <div key={item.id}>
          <dt>{formatDate(item.date)}</dt>
          <dd>
            {item.link ? (
              <a
                href={item.link}
                target={item.source === 'sanity' && item.link.startsWith('http') ? '_blank' : undefined}
                rel={item.source === 'sanity' && item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
