import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { getEducationIntro } from "@/data/dept/education";
import type { Locale } from "@/i18n/routing";

// The lecture materials block is hidden, not deleted: the external page it
// linked to is gone and is not expected to come back, but the department may
// still want something in its place. Everything it needs is kept —
// getEducationMaterials in data/dept/education.ts, the education.materialsTitle
// and education.materialsText messages, and the .hm-edu-link styles — so
// bringing it back is uncommenting this and its imports:
//   import HeadingSm from "@/components/home/HeadingSm";
//   import { getEducationMaterials } from "@/data/dept/education";
//
//   const materials = getEducationMaterials(locale as Locale);
//   const materialsTitle = t("education.materialsTitle");
//
//   <div className="hm-container hm-edu-body">
//     <section data-reveal>
//       <HeadingSm title={materialsTitle} en="Lecture Materials" />
//       <p className="hm-prose">{t("education.materialsText")}</p>
//       <div className="hm-edu-link">
//         <a href={materials.href} target="_blank" rel="noopener noreferrer" className="hm-link-card">
//           <span className="hm-link-jp">{materialsTitle}</span>
//           {materialsTitle !== materials.en && (
//             <span className="hm-link-en">{materials.en}</span>
//           )}
//           <span className="hm-link-mark" aria-hidden="true">↗</span>
//         </a>
//         <p className="hm-edu-note">※ {materials.note}</p>
//       </div>
//     </section>
//   </div>
//
// This leaves the page as the hero alone until its new content is written.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });
  return { title: t("education.title"), description: t("meta.educationDesc") };
}

export default async function Education({
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
        en="Education"
        title={t("education.title")}
        description={getEducationIntro(locale as Locale)}
      />

      <HomeEffects />
    </main>
  );
}
