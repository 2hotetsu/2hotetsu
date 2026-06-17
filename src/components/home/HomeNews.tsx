import Link from "next/link";
import { getDeptNews, getMonthAnchor } from "@/lib/dept/getDeptNews";
import { getTopicsData, type TopicsEntry } from "@/lib/dept/getTopicsData";

const MAX_ITEMS = 6;

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

export default async function HomeNews() {
  const [sanityItems, topicsItems] = await Promise.all([
    getDeptNews(MAX_ITEMS),
    Promise.resolve(getTopicsData(MAX_ITEMS)),
  ]);

  const sanityEntries: NewsEntry[] = sanityItems.map((item) => ({
    id: item._id,
    date: item.date,
    text: item.body,
    link: `/topics#${getMonthAnchor(item.date)}`,
  }));

  const topicsEntries: NewsEntry[] = (topicsItems as TopicsEntry[]).map((item) => ({
    id: item.id,
    date: item.date,
    text: item.text,
    link: item.anchor,
  }));

  const remaining = Math.max(0, MAX_ITEMS - sanityEntries.length);
  const combined = [...sanityEntries, ...topicsEntries.slice(0, remaining)];

  if (combined.length === 0) {
    return <p className="hm-news-empty">新着情報はありません。</p>;
  }

  return (
    <ul className="hm-news-list" data-reveal-group>
      {combined.map((item) => (
        <li key={item.id} data-reveal-item>
          <Link href={item.link} className="hm-news-row">
            <time className="hm-news-date" dateTime={item.date}>
              {formatDate(item.date)}
            </time>
            <span className="hm-news-text">{item.text}</span>
            <span className="hm-news-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
