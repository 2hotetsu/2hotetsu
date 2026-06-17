import type { Metadata } from "next";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { getAchievements } from "@/lib/dept/getAchievements";
import archive from "@/data/dept/achievements-archive.json";

export const metadata: Metadata = {
  title: "業績集 | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野の業績集です。学術論文および科学研究費等の一覧を掲載しています。",
};

const URL_RE = /(https?:\/\/[^\s　]+)/g;

// render bare URLs inside a citation as links
function linkify(text: string) {
  return text.split(URL_RE).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default async function Achievements() {
  const sanityEntries = await getAchievements();

  const sections = [
    {
      id: "achievements01",
      title: "学術論文",
      en: "Academic Papers",
      items: [
        ...sanityEntries.filter((e) => e.category === "paper").map((e) => e.title),
        ...archive.papers,
      ],
    },
    {
      id: "achievements02",
      title: "科学研究費等",
      en: "Research Grants",
      items: [
        ...sanityEntries.filter((e) => e.category === "grant").map((e) => e.title),
        ...archive.grants,
      ],
    },
  ];

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="Achievements"
        title="業績集"
        description="当分野の学術論文および科学研究費等の一覧です。"
      />

      <nav className="hm-anchor-nav" aria-label="業績集ナビゲーション">
        <ul>
          {sections.map(({ id, title, items }) => (
            <li key={id}>
              <a href={`#${id}`}>
                {title}（{items.length}）
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hm-container hm-ach-body">
        {sections.map(({ id, title, en, items }) => (
          <section className="hm-ach-section" id={id} key={id}>
            <header className="hm-heading-sm" data-reveal>
              <h2>{title}</h2>
              <span className="hm-heading-sm-en">{en}</span>
            </header>
            <ul className="hm-ach-list">
              {items.map((item, i) => (
                <li key={`${id}-${i}`}>{linkify(item)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <HomeEffects />
    </main>
  );
}
