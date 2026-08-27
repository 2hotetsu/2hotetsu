// Treatment content for the clinic page, extracted from the legacy clinic.html.
// Anchor ids (clinic01…clinic07) are kept from the old page for link compat.

import type { FeatureSection } from "@/components/home/FeatureSections";
import type { Locale } from "@/i18n/routing";
import { type L, pick, pickAll } from "./i18n";

const INTRO: L = {
  ja: "いろいろな義歯や補綴装置を用いて口腔の機能と形態を回復することで、患者の皆さんのQuality of Life向上を目指した診療を行っています。",
  en: "Using a range of dentures and prosthetic appliances, we restore both the function and the form of the mouth, with the aim of improving each patient's quality of life.",
};

interface ClinicSection {
  id: string;
  title: L;
  en: string;
  images: FeatureSection["images"];
  paragraphs: L[];
  link?: { href: string; label: L };
}

const SECTIONS: ClinicSection[] = [
  {
    id: "clinic01",
    title: { ja: "クラウン・ブリッジ", en: "Crown & Bridge" },
    en: "Crown & Bridge",
    images: [
      { src: "/images/clinic/01.jpg", width: 300, height: 225, alt: "治療前" },
      { src: "/images/clinic/02.jpg", width: 300, height: 225, alt: "治療後" },
    ],
    paragraphs: [
      {
        ja: "上顎側切歯の矮小歯をジルコニア陶材焼付冠で修復した症例です（左・治療前、右・治療後）。",
        en: "A case in which a peg-shaped maxillary lateral incisor was restored with a zirconia porcelain-fused crown (left: before treatment, right: after treatment).",
      },
      {
        ja: "セラミック包丁の素材でもあるジルコニアを用いることで、メタルフリーの歯科治療を行っています。",
        en: "By using zirconia — the same material found in ceramic knives — we are able to offer metal-free dental treatment.",
      },
    ],
  },
  {
    id: "clinic02",
    title: { ja: "有床義歯", en: "Removable Dentures" },
    en: "Removable Denture",
    images: [
      { src: "/images/clinic/03.jpg", width: 400, height: 300, alt: "部分入れ歯の例" },
    ],
    paragraphs: [
      {
        ja: "歯の抜けた部分に取り付ける部分入れ歯の例です（左・金属床、右・レジン床義歯）。",
        en: "Examples of partial dentures fitted where teeth have been lost (left: metal-based denture, right: resin-based denture).",
      },
      {
        ja: "症例に応じた様々な技術や材料を使用することで、使いやすい入れ歯の製作を行います。",
        en: "We draw on a variety of techniques and materials according to each case, so that the finished denture is comfortable to use.",
      },
    ],
  },
  {
    id: "clinic03",
    title: { ja: "インプラント義歯", en: "Implant Dentures" },
    en: "Implant Denture",
    images: [
      { src: "/images/clinic/04.jpg", width: 400, height: 300, alt: "インプラント義歯の症例" },
    ],
    paragraphs: [
      {
        ja: "人工歯根（歯科インプラント）を用いた義歯によって全ての歯を無くした上顎の治療を行った症例です。",
        en: "A case in which a fully edentulous upper jaw was treated with a denture supported by artificial tooth roots (dental implants).",
      },
      {
        ja: "インプラント義歯は１本から全顎まで歯を無くしたほとんどの患者さんの治療に用いることができますので、お気軽にご相談下さい。",
        en: "Implant dentures can be used for most patients who have lost teeth, from a single tooth to a whole arch. Please feel free to consult us.",
      },
    ],
  },
  {
    id: "clinic04",
    title: { ja: "顎義歯", en: "Maxillofacial Prostheses" },
    en: "Maxillofacial Prosthesis",
    images: [
      { src: "/images/clinic/05.jpg", width: 400, height: 268, alt: "顎義歯の一例" },
    ],
    paragraphs: [
      {
        ja: "手術や事故などによって生じた顎骨や顔面の欠損を治療するために用いる特殊な入れ歯です。",
        en: "These are specialised prostheses used to treat defects of the jawbone or face resulting from surgery, accidents and similar causes.",
      },
      {
        ja: "写真は上顎骨の欠損による口腔と鼻腔の穿孔を防ぐために用いる義歯の一例です。",
        en: "The photograph shows one such prosthesis, used to close a communication between the oral and nasal cavities caused by a defect of the upper jawbone.",
      },
    ],
  },
  {
    id: "clinic05",
    title: { ja: "歯科用金属アレルギー", en: "Dental Metal Allergy" },
    en: "Dental Metal Allergy",
    images: [
      { src: "/images/clinic/06.jpg", width: 274, height: 196, alt: "治療前" },
      { src: "/images/clinic/07.jpg", width: 283, height: 196, alt: "治療後" },
    ],
    paragraphs: [
      {
        ja: "歯の治療に用いた金属が原因となって全身の皮膚に湿疹などの症状が引き起こされる場合があります。",
        en: "Metals used in dental treatment can sometimes trigger symptoms such as eczema on the skin throughout the body.",
      },
      {
        ja: "このような例では口腔内からアレルギーの原因となる金属製の修復物を除去して、金属を含まない材料で治療を行います（左・治療前、右・治療後）。",
        en: "In such cases we remove the metal restorations responsible for the allergy from the mouth and treat the teeth with metal-free materials (left: before treatment, right: after treatment).",
      },
    ],
    link: {
      href: "/allergy",
      label: {
        ja: "歯科用金属アレルギー外来のご案内",
        en: "About the Dental Metal Allergy Clinic",
      },
    },
  },
  {
    id: "clinic06",
    title: {
      ja: "睡眠時無呼吸症候群治療用マウスピース",
      en: "Oral Appliances for Sleep Apnoea",
    },
    en: "Oral Appliance for Sleep Apnea",
    images: [
      { src: "/images/clinic/08.jpg", width: 400, height: 300, alt: "治療用マウスピース" },
    ],
    paragraphs: [
      {
        ja: "睡眠中の無呼吸のほとんどは上気道の閉塞によって引き起こされ、激しいいびきや日中の眠気などの原因となります。",
        en: "Most apnoea during sleep is caused by obstruction of the upper airway, which in turn leads to heavy snoring and daytime sleepiness.",
      },
      {
        ja: "このマウスピースは下顎を前方に引き出し気道を拡大することによって、睡眠中の無呼吸を軽減します。",
        en: "This oral appliance draws the lower jaw forward to widen the airway, reducing apnoea during sleep.",
      },
      {
        ja: "（健康保険での治療には睡眠検査を行った病院からの紹介状が必要です）",
        en: "(Treatment under national health insurance requires a referral from the hospital where the sleep study was carried out.)",
      },
    ],
  },
  {
    id: "clinic07",
    title: { ja: "顎関節症・口腔顔面痛", en: "TMD & Orofacial Pain" },
    en: "TMD & Orofacial Pain",
    images: [
      { src: "/images/clinic/09.jpg", width: 320, height: 240, alt: "顎関節症の診療" },
    ],
    paragraphs: [
      {
        ja: "顎の関節の雑音、開口障害、痛みなどの症状を起こす顎関節症や、顔や頭頸部周辺の痛みに悩む患者さんへの治療を行っています。",
        en: "We treat patients with temporomandibular disorders — which cause joint noises, restricted mouth opening and pain — as well as those suffering from pain in the face, head and neck.",
      },
    ],
  },
];

export const getClinicIntro = (locale: Locale) => pick(INTRO, locale);

export const getClinicSections = (locale: Locale): FeatureSection[] =>
  SECTIONS.map(({ id, title, en, images, paragraphs, link }) => ({
    id,
    title: pick(title, locale),
    en,
    images,
    paragraphs: pickAll(paragraphs, locale),
    ...(link && { link: { href: link.href, label: pick(link.label, locale) } }),
  }));
