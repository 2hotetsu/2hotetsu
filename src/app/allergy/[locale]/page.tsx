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

const clinicJsonLd = (locale: string) => ({
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

const medicalConditionJsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalCondition',
  inLanguage: locale === 'ja' ? 'ja' : 'en',
  name: locale === 'ja' ? '歯科用金属アレルギー' : 'Dental Metal Allergy',
  alternateName:
    locale === 'ja'
      ? ['金属アレルギー', '接触性皮膚炎', '全身型金属アレルギー']
      : ['Metal Allergy', 'Contact Dermatitis from Dental Metals', 'Systemic Metal Allergy'],
  description:
    locale === 'ja'
      ? '皮膚や口腔粘膜面に接した金属がイオン化すると、体内のタンパク質と結合して新たなタンパク質に変性することがあります。それを体が"異物"とみなすことによって生じるのが金属アレルギーです。接触性皮膚炎と全身型金属アレルギーに大きく分類されます。'
      : 'Metal allergy occurs when metals in contact with the skin or oral mucosa dissolve into ions and bind with body proteins, forming substances recognized as foreign and triggering an allergic reaction. It is classified into contact dermatitis and systemic metal allergy.',
  signOrSymptom: [
    { '@type': 'MedicalSymptom', name: locale === 'ja' ? '皮膚のかゆみ' : 'Skin itching' },
    { '@type': 'MedicalSymptom', name: locale === 'ja' ? '皮膚の赤み' : 'Skin redness' },
    { '@type': 'MedicalSymptom', name: locale === 'ja' ? '発疹・ブツブツ' : 'Rashes' },
    { '@type': 'MedicalSymptom', name: locale === 'ja' ? '水ぶくれ' : 'Blisters' },
    {
      '@type': 'MedicalSymptom',
      name:
        locale === 'ja'
          ? '手足・口腔内・全身の皮膚炎（全身型金属アレルギー）'
          : 'Dermatitis affecting hands, feet, oral cavity, or entire body (systemic metal allergy)',
    },
  ],
  cause: {
    '@type': 'MedicalCause',
    name:
      locale === 'ja'
        ? '歯科用金属（パラジウム、金、錫など）やニッケルを含む金属製品との接触'
        : 'Contact with dental metals (palladium, gold, tin, etc.) or metal products containing nickel',
  },
  possibleTreatment: {
    '@type': 'MedicalTherapy',
    name: locale === 'ja' ? '原因金属の除去治療' : 'Removal of causative dental metals',
    description:
      locale === 'ja'
        ? 'パッチテストで特定された金属をお口の中から除去する治療。かかりつけ歯科医と連携して行います。'
        : "Removal of metals identified by patch test from the oral cavity, performed in coordination with the patient's regular dentist.",
  },
  typicalTest: {
    '@type': 'MedicalTest',
    name: locale === 'ja' ? 'パッチテスト' : 'Patch Test',
    usedToDiagnose: {
      '@type': 'MedicalCondition',
      name: locale === 'ja' ? '歯科用金属アレルギー' : 'Dental Metal Allergy',
    },
  },
  recognizingAuthority: {
    '@type': 'MedicalOrganization',
    name: locale === 'ja' ? '日本アレルギー学会' : 'Japanese Society of Allergology',
  },
});

const patchTestJsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  inLanguage: locale === 'ja' ? 'ja' : 'en',
  name: locale === 'ja' ? 'パッチテスト（金属アレルギー検査）' : 'Patch Test for Dental Metal Allergy',
  description:
    locale === 'ja'
      ? '金属アレルギーの検査は、血液検査ではなくパッチテストで行います。いくつかの金属の薬をつけた特殊なばんそうこうを２日間背中に貼り、３回にわたって皮膚の反応をチェックします。'
      : 'Testing for metal allergies is performed using a patch test, not a blood test. Special adhesive patches containing small amounts of various metals are applied to the back for two days, with reactions evaluated over three follow-up visits.',
  procedureType: 'DiagnosticProcedure',
  bodyLocation: locale === 'ja' ? '背中' : 'Back',
  preparation:
    locale === 'ja'
      ? '４回全ての受診が必要です。７・８月は汗をかくためパッチテストは行えません。'
      : 'All four visits are required to complete the patch test. Patch testing is not available in July and August due to increased sweating.',
  followup:
    locale === 'ja'
      ? 'パッチテストで特定の金属に対するアレルギーが確認された場合、かかりつけ歯科医に情報を提供し連携して治療を進めます。'
      : "If the test confirms an allergy to a particular metal used in dental treatment, information will be provided to the patient's regular dentist for coordinated treatment.",
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: locale === 'ja' ? '初診' : 'Initial Visit',
      text:
        locale === 'ja'
          ? '問診を行い、パッチテストの予約をします。'
          : 'Medical interview and scheduling of the patch test.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: locale === 'ja' ? 'パッチテスト（月曜日）' : 'Patch Test – Monday',
      text:
        locale === 'ja'
          ? '背中に薬をつけたばんそうこうを2日間貼る。'
          : 'Adhesive patches containing test materials are applied to the back and left in place for two days.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: locale === 'ja' ? 'パッチテスト（水曜日）' : 'Patch Test – Wednesday',
      text:
        locale === 'ja'
          ? 'ばんそうこうをはがし、皮膚の状態を確認します。'
          : 'Patches are removed and the skin condition is evaluated.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: locale === 'ja' ? 'パッチテスト（木曜日）' : 'Patch Test – Thursday',
      text:
        locale === 'ja'
          ? '皮膚の状態を再度確認します。'
          : 'Follow-up evaluation of the skin condition.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: locale === 'ja' ? 'パッチテスト（翌月曜日）' : 'Patch Test – Following Monday',
      text:
        locale === 'ja'
          ? '最終診断を行い、かかりつけ歯科へ紹介します。'
          : "Final diagnosis and referral to the patient's regular dentist.",
    },
  ],
  performedBy: {
    '@type': 'MedicalOrganization',
    name:
      locale === 'ja'
        ? '徳島大学病院 歯科用金属アレルギー外来'
        : 'Tokushima University Hospital Dental Metal Allergy Clinic',
    url: `${SITE_URL}/allergy/${locale}`,
  },
});

const faqJsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: locale === 'ja' ? 'ja' : 'en',
  mainEntity: [
    {
      '@type': 'Question',
      name: locale === 'ja' ? '金属アレルギーとは何ですか？' : 'What is metal allergy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          locale === 'ja'
            ? '皮膚や口腔粘膜面に接した金属がイオン化すると、体内のタンパク質と結合して新たなタンパク質に変性し、体が"異物"とみなすことで生じるのが金属アレルギーです。接触性皮膚炎（かぶれ）と全身型金属アレルギーに分類され、ネックレス・ピアスなどの金属アクセサリーや歯科用金属（パラジウム、金、錫など）が原因となります。症状は皮膚の赤み・かゆみ・発疹・水ぶくれなどです。'
            : 'Metal allergy occurs when metals in contact with the skin or oral mucosa dissolve into ions and bind with body proteins, forming substances recognized as foreign and triggering an allergic reaction. It is classified into contact dermatitis and systemic metal allergy. Causes include metal accessories (necklaces, earrings) and dental metals (palladium, gold, tin, etc.). Symptoms include redness, itching, rashes, and blisters.',
      },
    },
    {
      '@type': 'Question',
      name:
        locale === 'ja'
          ? '金属アレルギーの検査はどのように行いますか？'
          : 'How is metal allergy tested?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          locale === 'ja'
            ? '金属アレルギーの検査は血液検査ではなくパッチテストで行います。いくつかの金属の薬をつけた特殊なばんそうこうを２日間背中に貼り、ばんそうこうをはがした後、３回（水・木・翌月曜）にわたって皮膚の反応を確認します。全4回の受診が必要で、７・８月は汗の影響により実施できません。'
            : 'Metal allergy testing is performed with a patch test, not a blood test. Special adhesive patches containing various metals are applied to the back for two days. After removal, skin reactions are evaluated over three follow-up visits (Wednesday, Thursday, following Monday). All four visits are required, and testing is unavailable in July and August due to sweating.',
      },
    },
    {
      '@type': 'Question',
      name:
        locale === 'ja'
          ? '歯科用金属やアクセサリーに含まれる金属の種類を調べることはできますか？'
          : 'Can you identify the metals in dental restorations or accessories?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          locale === 'ja'
            ? '当外来では蛍光X線分析装置（XRF）を使った金属試料元素分析検査を行っています。お口の中のつめもの・かぶせもの・入れ歯の金属部分や、ピアス・ネックレスなどの金属製品を破壊せずに金属の種類を特定できます。パッチテストの結果と照らし合わせることで、除去すべき歯科材料や避けるべき金属製品を確認できます。'
            : 'Our clinic offers elemental analysis using an X-ray fluorescence (XRF) analyzer, which can identify metals in dental restorations (fillings, crowns, dentures) and accessories (earrings, necklaces) without damaging them. Combined with patch test results, this helps determine which dental materials should be removed and which metal products to avoid.',
      },
    },
    {
      '@type': 'Question',
      name:
        locale === 'ja'
          ? 'ピアスで金属アレルギーを防ぐにはどうすればよいですか？'
          : 'How can I prevent metal allergy from earrings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          locale === 'ja'
            ? 'ピアスホールは皮膚科や美容クリニックなど医療機関で開けましょう。傷が治るまで清潔に保ち、皮膚を傷つけた場合はピアスを外して完治を待ちましょう。安価なピアスは汗で金属が溶け出すことがあるため、溶け出しにくい素材を選ぶことが大切です。かゆみ・赤み・腫れ・汁が出る場合はすぐに使用を中断し皮膚科を受診してください。'
            : 'Have your ears pierced at a medical institution such as a dermatology or cosmetic clinic. Keep the area clean until healed, and remove earrings if skin is injured. Avoid very inexpensive earrings that may release metal due to sweating — choose products made from materials less likely to release metal ions. If you experience itching, redness, swelling, or discharge, stop using earrings immediately and consult a dermatologist.',
      },
    },
  ],
});

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Index');

  return (
    <div className={styles.container}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalConditionJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(patchTestJsonLd(locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(locale)) }} />
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
