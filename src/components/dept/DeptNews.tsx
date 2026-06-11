import { getDeptNews, getMonthAnchor } from "@/lib/dept/getDeptNews";
import { getTopicsData, type TopicsEntry } from "@/lib/dept/getTopicsData";

interface NewsEntry {
  id: string;
  date: string;
  text: string;
  link: string;
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default async function DeptNews() {
  // fetch both sources in parallel
  const [sanityItems, topicsItems] = await Promise.all([
    getDeptNews(15),
    Promise.resolve(getTopicsData(20)),
  ]);

  // normalise Sanity entries
  const sanityEntries: NewsEntry[] = sanityItems.map((item) => ({
    id: item._id,
    date: item.date,
    text: item.body,
    link: `/topics#${getMonthAnchor(item.date)}`,
  }));

  // normalise topics entries — only use as many as needed to reach 15 total
  const topicsEntries: NewsEntry[] = (topicsItems as TopicsEntry[]).map((item) => ({
    id: item.id,
    date: item.date,
    text: item.text,
    link: item.anchor,
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
            <a href={item.link}>{item.text}</a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
