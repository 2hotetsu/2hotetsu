import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import SectionHead from "@/components/home/SectionHead";
import HomeEffects from "@/components/home/HomeEffects";
import FeatureSections from "@/components/home/FeatureSections";
import { getClinicIntro, getClinicSections } from "@/data/dept/clinic";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("clinic.title"), description: t("meta.clinicDesc") };
}

export default async function Clinic({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dept");
  const sections = getClinicSections(locale as Locale);

  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="Clinic"
        title={t("clinic.title")}
        description={getClinicIntro(locale as Locale)}
      />

      <nav className="hm-anchor-nav" aria-label={t("clinic.ariaNav")}>
        <ul>
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <FeatureSections sections={sections} />

      <section className="hm-clinic-cta">
        <div className="hm-container">
          <SectionHead en="Contact" title={t("clinic.ctaTitle")} />
          <div className="hm-clinic-cta-body" data-reveal>
            <p className="hm-clinic-cta-name">{t("clinic.ctaName")}</p>
            <p className="hm-clinic-cta-tel">
              <span>TEL</span>088-633-7371
            </p>
            <p className="hm-clinic-cta-addr">{t("clinic.ctaAddr")}</p>
          </div>
        </div>
      </section>

      <HomeEffects />
    </main>
  );
}
