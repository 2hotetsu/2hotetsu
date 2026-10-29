import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { deptNewsQuery } from "@/sanity/lib/queries";

export interface DeptNewsImage {
  url: string;
  /** the photo resized for /topics: 680px wide, own proportions */
  frameUrl: string;
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
    _id?: string;
    url?: string;
    metadata?: { dimensions?: { width?: number; height?: number } };
  };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

/**
 * 680px wide — twice the 340px cell, for sharp screens — in the photo's own
 * proportions. Phone photos arrive at 3000–4000px, so this is a fraction of
 * the original's weight. How a portrait is framed is left to dept.css.
 */
function frameUrl({ asset, crop }: RawDeptNewsImage): string {
  return urlForImage({ asset: { _ref: asset!._id }, crop }).width(680).url();
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
        .filter((img) => img.asset?.url && img.asset._id)
        .map((img) => ({
          url: img.asset!.url!,
          frameUrl: frameUrl(img),
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

// e.g. "2026-06-15" -> "2026年6月"
export function getMonthLabel(date: string): string {
  const [y, m] = date.split("-");
  return `${y}年${parseInt(m, 10)}月`;
}
