import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import HeadingSm from "@/components/home/HeadingSm";
import HomeEffects from "@/components/home/HomeEffects";
import { getRecruitIntro, getRecruitQa } from "@/data/dept/recruit";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("recruit.title"), description: t("meta.recruitDesc") };
}

export default async function Recruit({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="Recruit"
        title={t("recruit.title")}
        description={getRecruitIntro(locale as Locale)}
      />

      <div className="hm-container hm-qa-body">
        <HeadingSm title={t("recruit.qaTitle")} en="Q&amp;A" />
        <div className="hm-qa-list" data-reveal-group>
          {getRecruitQa(locale as Locale).map(({ q, a }) => (
            <section className="hm-qa-item" key={q} data-reveal-item>
              <h3 className="hm-qa-q">
                <span aria-hidden="true">Q</span>
                {q}
              </h3>
              <p className="hm-qa-a">
                <span aria-hidden="true">A</span>
                {a}
              </p>
            </section>
          ))}
        </div>
      </div>

      <HomeEffects />
    </main>
  );
}
