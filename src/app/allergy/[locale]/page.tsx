import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import styles from "./page.module.css";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Nav from "@/components/Nav/Nav";
import FadeIn from "@/components/FadeIn/FadeIn";
import Symptoms from '@/components/Symptoms/Symptoms';
import Patch from '@/components/Patch/Patch';
import Articles from '@/components/Articles/Articles';
import News from '@/components/News/News';
import Highlights from '@/components/Highlights/Highlights';
import Research from '@/components/Research/Research';
import Access from '@/components/Access/Access';
import { SITE_URL } from '@/lib/siteConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== 'en';

  return {
    alternates: {
      canonical: `${SITE_URL}/allergy/${locale}`,
      languages: {
        ja: `${SITE_URL}/allergy/ja`,
        en: `${SITE_URL}/allergy/en`,
      },
    },
    openGraph: {
      url: `${SITE_URL}/allergy/${locale}`,
      title: isJa
        ? '歯科用金属アレルギー外来 | 徳島大学病院'
        : 'Dental Metal Allergy Clinic | Tokushima University Hospital',
      description: isJa
        ? '徳島大学病院 歯科用金属アレルギー外来。歯科用金属が原因のアレルギー症状の診断・パッチテスト・治療を行う専門外来です。'
        : 'Tokushima University Hospital Dental Metal Allergy Clinic. Diagnosis, patch testing, and treatment for allergic reactions caused by dental metals.',
    },
  };
}

const jsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: locale === 'ja' ? '歯科用金属アレルギー外来' : 'Dental Metal Allergy Clinic',
  description:
    locale === 'ja'
      ? '歯科用金属が原因のアレルギー症状の診断・パッチテスト・治療を行う専門外来'
      : 'Specialized outpatient clinic for diagnosis, patch testing, and treatment of allergic reactions caused by dental metals',
  url: `${SITE_URL}/allergy/${locale}`,
  telephone: '088-633-7371',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '蔵本町2丁目50-1',
    addressLocality: '徳島市',
    addressRegion: '徳島県',
    postalCode: '770-8503',
    addressCountry: 'JP',
  },
  parentOrganization: {
    '@type': 'Hospital',
    name: locale === 'ja' ? '徳島大学病院' : 'Tokushima University Hospital',
    url: 'https://www.tokushima-hosp.jp',
  },
  medicalSpecialty: 'Dentistry',
});

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Index');

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
      />
      <main className={styles.main}>
        <HeroSlider>
          <h2>{t('heroTitle')}</h2>
          <p>{t('heroDescription')}</p>
        </HeroSlider>
        <Nav />

        <FadeIn>
          <Symptoms />
        </FadeIn>

        <FadeIn>
          <Patch />
        </FadeIn>

        <FadeIn>
          <Articles />
        </FadeIn>

        <FadeIn>
          <News params={params} />
        </FadeIn>

        <FadeIn>
          <Highlights params={params} />
        </FadeIn>

        <FadeIn>
          <Research />
        </FadeIn>

        <FadeIn>
          <Access />
        </FadeIn>
      </main>
    </div>
  );
}
