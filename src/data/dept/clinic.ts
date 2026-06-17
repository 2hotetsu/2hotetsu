// Treatment content for the clinic page, extracted from the legacy clinic.html.
// Anchor ids (clinic01…clinic07) are kept from the old page for link compat.

import type { FeatureSection } from "@/components/home/FeatureSections";

export const CLINIC_INTRO =
  "いろいろな義歯や補綴装置を用いて口腔の機能と形態を回復することで、患者の皆さんのQuality of Life向上を目指した診療を行っています。";

export const CLINIC_SECTIONS: FeatureSection[] = [
  {
    id: "clinic01",
    title: "クラウン・ブリッジ",
    en: "Crown & Bridge",
    images: [
      { src: "/images/clinic/01.jpg", width: 300, height: 225, alt: "治療前" },
      { src: "/images/clinic/02.jpg", width: 300, height: 225, alt: "治療後" },
    ],
    paragraphs: [
      "上顎側切歯の矮小歯をジルコニア陶材焼付冠で修復した症例です（左・治療前、右・治療後）。",
      "セラミック包丁の素材でもあるジルコニアを用いることで、メタルフリーの歯科治療を行っています。",
    ],
  },
  {
    id: "clinic02",
    title: "有床義歯",
    en: "Removable Denture",
    images: [
      { src: "/images/clinic/03.jpg", width: 400, height: 300, alt: "部分入れ歯の例" },
    ],
    paragraphs: [
      "歯の抜けた部分に取り付ける部分入れ歯の例です（左・金属床、右・レジン床義歯）。",
      "症例に応じた様々な技術や材料を使用することで、使いやすい入れ歯の製作を行います。",
    ],
  },
  {
    id: "clinic03",
    title: "インプラント義歯",
    en: "Implant Denture",
    images: [
      { src: "/images/clinic/04.jpg", width: 400, height: 300, alt: "インプラント義歯の症例" },
    ],
    paragraphs: [
      "人工歯根（歯科インプラント）を用いた義歯によって全ての歯を無くした上顎の治療を行った症例です。",
      "インプラント義歯は１本から全顎まで歯を無くしたほとんどの患者さんの治療に用いることができますので、お気軽にご相談下さい。",
    ],
  },
  {
    id: "clinic04",
    title: "顎義歯",
    en: "Maxillofacial Prosthesis",
    images: [
      { src: "/images/clinic/05.jpg", width: 400, height: 268, alt: "顎義歯の一例" },
    ],
    paragraphs: [
      "手術や事故などによって生じた顎骨や顔面の欠損を治療するために用いる特殊な入れ歯です。",
      "写真は上顎骨の欠損による口腔と鼻腔の穿孔を防ぐために用いる義歯の一例です。",
    ],
  },
  {
    id: "clinic05",
    title: "歯科用金属アレルギー",
    en: "Dental Metal Allergy",
    images: [
      { src: "/images/clinic/06.jpg", width: 274, height: 196, alt: "治療前" },
      { src: "/images/clinic/07.jpg", width: 283, height: 196, alt: "治療後" },
    ],
    paragraphs: [
      "歯の治療に用いた金属が原因となって全身の皮膚に湿疹などの症状が引き起こされる場合があります。",
      "このような例では口腔内からアレルギーの原因となる金属製の修復物を除去して、金属を含まない材料で治療を行います（左・治療前、右・治療後）。",
    ],
    link: { href: "/allergy/ja", label: "歯科用金属アレルギー外来のご案内" },
  },
  {
    id: "clinic06",
    title: "睡眠時無呼吸症候群治療用マウスピース",
    en: "Oral Appliance for Sleep Apnea",
    images: [
      { src: "/images/clinic/08.jpg", width: 400, height: 300, alt: "治療用マウスピース" },
    ],
    paragraphs: [
      "睡眠中の無呼吸のほとんどは上気道の閉塞によって引き起こされ、激しいいびきや日中の眠気などの原因となります。",
      "このマウスピースは下顎を前方に引き出し気道を拡大することによって、睡眠中の無呼吸を軽減します。",
      "（健康保険での治療には睡眠検査を行った病院からの紹介状が必要です）",
    ],
  },
  {
    id: "clinic07",
    title: "顎関節症・口腔顔面痛",
    en: "TMD & Orofacial Pain",
    images: [
      { src: "/images/clinic/09.jpg", width: 320, height: 240, alt: "顎関節症の診療" },
    ],
    paragraphs: [
      "顎の関節の雑音、開口障害、痛みなどの症状を起こす顎関節症や、顔や頭頸部周辺の痛みに悩む患者さんへの治療を行っています。",
    ],
  },
];
