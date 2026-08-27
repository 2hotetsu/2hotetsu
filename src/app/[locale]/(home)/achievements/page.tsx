import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import HeadingSm from "@/components/home/HeadingSm";
import HomeEffects from "@/components/home/HomeEffects";
import { getAchievements } from "@/lib/dept/getAchievements";
import archive from "@/data/dept/achievements-archive.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("achievements.title"), description: t("meta.achievementsDesc") };
}

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

export default async function Achievements({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");

  const sanityEntries = await getAchievements();

  // Citations are not translated: each publication stays in the language it
  // was written in — that is how citations work, and translating one would
  // misrepresent the reference.
  const sections = [
    {
      id: "achievements01",
      title: t("achievements.papers"),
      en: "Academic Papers",
      items: [
        ...sanityEntries.filter((e) => e.category === "paper").map((e) => e.title),
        ...archive.papers,
      ],
    },
    {
      id: "achievements02",
      title: t("achievements.grants"),
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
        title={t("achievements.title")}
        description={t("achievements.desc")}
      />

      <nav className="hm-anchor-nav" aria-label={t("achievements.ariaNav")}>
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
            <HeadingSm title={title} en={en} />
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
