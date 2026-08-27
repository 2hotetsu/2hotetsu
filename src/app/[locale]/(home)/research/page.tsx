import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import FeatureSections from "@/components/home/FeatureSections";
import { getResearchIntro, getResearchSections } from "@/data/dept/research";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("research.title"), description: t("meta.researchDesc") };
}

export default async function Research({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");
  const sections = getResearchSections(locale as Locale);

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="Research"
        title={t("research.title")}
        description={getResearchIntro(locale as Locale)}
      />

      <nav className="hm-anchor-nav" aria-label={t("research.ariaNav")}>
        <ul>
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <FeatureSections sections={sections} />

      <HomeEffects />
    </main>
  );
}
