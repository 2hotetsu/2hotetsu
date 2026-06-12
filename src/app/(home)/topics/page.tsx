import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { getDeptNews, getMonthAnchor, getMonthLabel } from "@/lib/dept/getDeptNews";
import { TOPICS_ARCHIVE, sectionYear } from "@/lib/dept/topicsArchive";

export const metadata: Metadata = {
  title: "トピックス | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野の活動記録・トピックスです。",
};

interface UiImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface UiEntry {
  key: string;
  images: UiImage[];
  /** sanitised archive markup (<br>, <a> only) … */
  html?: string;
  /** … or plain text from Sanity */
  text?: string;
}

interface MonthBlock {
  anchor: string;
  label: string;
  year: number;
  entries: UiEntry[];
}

async function buildMonthBlocks(): Promise<MonthBlock[]> {
  // recent, Sanity-managed entries grouped by month
  const sanityBlocks: MonthBlock[] = [];
  for (const item of await getDeptNews(200)) {
    const anchor = getMonthAnchor(item.date);
    const entry: UiEntry = {
      key: item._id,
      text: item.body,
      images: item.images.map((img) => ({
        src: img.url,
        alt: img.alt ?? "",
        width: img.width,
        height: img.height,
      })),
    };
    const last = sanityBlocks[sanityBlocks.length - 1];
    if (last && last.anchor === anchor) {
      last.entries.push(entry);
    } else {
      sanityBlocks.push({
        anchor,
        label: getMonthLabel(item.date),
        year: parseInt(item.date.slice(0, 4), 10),
        entries: [entry],
      });
    }
  }

  // frozen archive converted from the legacy page
  const archiveBlocks: MonthBlock[] = TOPICS_ARCHIVE.map((section) => ({
    anchor: section.anchor,
    label: section.label,
    year: sectionYear(section.label) ?? 0,
    entries: section.entries.map((entry, idx) => ({
      key: `${section.anchor}-${idx}`,
      html: entry.html,
      images: entry.images,
    })),
  }));

  return [...sanityBlocks, ...archiveBlocks];
}

export default async function Topics() {
  const blocks = await buildMonthBlocks();
  const years = [...new Set(blocks.map((b) => b.year))];

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="Topics"
        title="トピックス"
        description="学会での受賞や入局、教室の出来事など、当分野の活動を記録しています。"
      />

      <nav className="hm-anchor-nav" aria-label="年別ナビゲーション">
        <ul>
          {years.map((year) => (
            <li key={year}>
              <a href={`#y${year}`}>{year}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hm-container hm-topics-body">
        {blocks.map((block, i) => {
          const isNewYear = i === 0 || blocks[i - 1].year !== block.year;
          return (
            <section className="hm-topics-month" id={block.anchor} key={block.anchor}>
              {isNewYear && (
                <p className="hm-year-head" id={`y${block.year}`}>
                  {block.year}
                </p>
              )}
              <header className="hm-heading-sm" data-reveal>
                <h2>{block.label}</h2>
              </header>
              <div className="hm-topics-list">
                {block.entries.map((entry) => (
                  <article className="hm-topic-entry" key={entry.key} data-reveal>
                    {entry.images.length > 0 && (
                      <div
                        className="hm-topic-images"
                        data-count={Math.min(entry.images.length, 2)}
                      >
                        {entry.images.map((img) => (
                          <Image
                            key={img.src}
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            sizes="(max-width: 720px) 92vw, 460px"
                          />
                        ))}
                      </div>
                    )}
                    {entry.html ? (
                      <p
                        className="hm-topic-text"
                        dangerouslySetInnerHTML={{ __html: entry.html }}
                      />
                    ) : (
                      <p className="hm-topic-text hm-topic-text-pre">{entry.text}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <HomeEffects />
    </main>
  );
}
