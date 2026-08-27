import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { getHistoryItems } from "@/data/dept/history";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("history.title"), description: t("meta.historyDesc") };
}

export default async function History({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");
  const items = getHistoryItems(locale as Locale);

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="History"
        title={t("history.title")}
        description={t("history.desc")}
      />

      <div className="hm-container hm-tl-body">
        <ol className="hm-timeline" data-reveal-group>
          {items.map(({ year, era, text }, i) => {
            const showYear = i === 0 || items[i - 1].year !== year;
            return (
              <li className="hm-tl-item" key={`${era}-${text}`} data-reveal-item>
                <div className="hm-tl-year">{showYear ? year : ""}</div>
                <div className="hm-tl-node" aria-hidden="true" />
                <div className="hm-tl-content">
                  <p className="hm-tl-era">{era}</p>
                  <p className="hm-tl-text">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <HomeEffects />
    </main>
  );
}
