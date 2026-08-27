import { client } from "@/sanity/lib/client";
import { deptNewsQuery } from "@/sanity/lib/queries";

export interface DeptNewsImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface DeptNewsEntry {
  _id: string;
  date: string;
  body: string;
  images: DeptNewsImage[];
}

interface RawDeptNewsImage {
  asset?: {
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
  alt?: string;
}

interface RawDeptNewsEntry {
  _id: string;
  date: string;
  body: string;
  images?: RawDeptNewsImage[];
}

export async function getDeptNews(limit = 15): Promise<DeptNewsEntry[]> {
  try {
    const items: RawDeptNewsEntry[] = await client.fetch(
      deptNewsQuery,
      { limit },
      { next: { revalidate: 3600 } }
    );

    return items.map((item) => ({
      _id: item._id,
      date: item.date,
      body: item.body,
      images: (item.images ?? [])
        .filter((img) => img.asset?.url)
        .map((img) => ({
          url: img.asset!.url!,
          width: img.asset!.metadata?.dimensions?.width ?? 340,
          height: img.asset!.metadata?.dimensions?.height ?? 240,
          alt: img.alt,
        })),
    }));
  } catch {
    return [];
  }
}

const MONTH_NAMES = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

// e.g. "2026-06-15" -> "june26", used as the /topics anchor for this month's entries
export function getMonthAnchor(date: string): string {
  const [y, m] = date.split("-");
  return `${MONTH_NAMES[parseInt(m, 10) - 1]}${y.slice(2)}`;
}

const MONTH_LABELS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// e.g. "2026-06-15" -> "2026年6月" (ja) / "June 2026" (en)
export function getMonthLabel(date: string, locale: string = "ja"): string {
  const [y, m] = date.split("-");
  const month = parseInt(m, 10);
  return locale === "en"
    ? `${MONTH_LABELS_EN[month - 1]} ${y}`
    : `${y}年${month}月`;
}
