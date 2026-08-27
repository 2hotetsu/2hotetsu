// Research themes, extracted from the legacy research.html.

import type { FeatureSection } from "@/components/home/FeatureSections";
import type { Locale } from "@/i18n/routing";
import { type L, pick, pickAll } from "./i18n";

const INTRO: L = {
  ja: "顎機能・咬合・口腔顔面痛などに関する研究活動をご紹介します。",
  en: "An introduction to our research on jaw function, occlusion and orofacial pain.",
};

interface ResearchSection {
  id: string;
  title: L;
  en: string;
  images: FeatureSection["images"];
  paragraphs: L[];
  link?: { href: string; label: L };
}

const SECTIONS: ResearchSection[] = [
  {
    id: "research01",
    title: { ja: "顎運動測定器の開発", en: "Developing Jaw Movement Trackers" },
    en: "Jaw Movement Tracking",
    images: [
      { src: "/images/research/01.jpg", width: 400, height: 300, alt: "顎運動測定器" },
    ],
    paragraphs: [
      {
        ja: "磁気センサを用いて数10μmの高い精度で６自由度顎運動（下顎の上顎に対する立体的な運動）を記録する測定器の開発を行っています。",
        en: "We are developing instruments that use magnetic sensors to record six-degree-of-freedom jaw movement — the three-dimensional motion of the lower jaw relative to the upper — with an accuracy of a few tens of micrometres.",
      },
      {
        ja: "下顎の動きを精密に測定することで、患者さんの顎の機能を詳細に評価し、診断するための研究を進めています。",
        en: "By measuring lower jaw movement precisely, we are working towards a detailed assessment and diagnosis of each patient's jaw function.",
      },
    ],
  },
  {
    id: "research02",
    title: { ja: "咬合可視化装置", en: "Occlusal Visualisation Devices" },
    en: "Occlusal Visualization",
    images: [
      { src: "/images/research/02.jpg", width: 400, height: 285, alt: "咬合可視化装置" },
    ],
    paragraphs: [
      {
        ja: "食事中など機能時や睡眠ブラキシズム時における上下の歯の接触状態（咬合）をコンピュータグラフィックスで観察することで、咬合についての客観的な診断や評価を可能にする「咬合可視化装置」の開発を行っています。",
        en: "We are developing an occlusal visualisation device that renders the contact between the upper and lower teeth — during function such as eating, and during sleep bruxism — as computer graphics, making objective diagnosis and assessment of occlusion possible.",
      },
      {
        ja: "機能運動時の咬合接触を明示することで、これまでは患者さんの感覚に頼っていた「噛みやすさ」に対する評価を、目に見える形で客観的に分析することが可能になります。",
        en: "Making occlusal contact visible during functional movement allows 'ease of chewing' — until now judged only from the patient's own sensation — to be analysed objectively in visible form.",
      },
    ],
  },
  {
    id: "research03",
    title: { ja: "睡眠ブラキシズム", en: "Sleep Bruxism" },
    en: "Sleep Bruxism",
    images: [
      { src: "/images/research/03.jpg", width: 400, height: 282, alt: "睡眠ブラキシズムの測定" },
    ],
    paragraphs: [
      {
        ja: "ブラキシズム（歯ぎしり）に伴う咀嚼筋の活動や下顎の動きを測定することで、ブラキシズムの診断と治療法の開発を目指す研究です。",
        en: "By measuring the masticatory muscle activity and lower jaw movement that accompany bruxism (tooth grinding), this research aims to develop ways of diagnosing and treating it.",
      },
      {
        ja: "睡眠中の顎の動きを分析することで、歯や顎の障害を引き起こすブラキシズムの発生メカニズムとその防止法についての解析を進めています。",
        en: "Analysing jaw movement during sleep, we are investigating the mechanisms behind the bruxism that damages the teeth and jaw, and how it might be prevented.",
      },
    ],
  },
  {
    id: "research04",
    title: { ja: "歯科用金属アレルギー", en: "Dental Metal Allergy" },
    en: "Dental Metal Allergy",
    images: [
      { src: "/images/research/04.jpg", width: 400, height: 300, alt: "蛍光エックス線分析装置" },
    ],
    paragraphs: [
      {
        ja: "口腔内の修復物に含まれる金属元素の分析に用いる蛍光エックス線分析装置です。パッチテストにより判定したアレルゲンが、どの修復物に含まれるかを調査するために使用します。",
        en: "This X-ray fluorescence analyser identifies the metallic elements contained in restorations in the mouth. We use it to determine which restoration contains the allergen identified by patch testing.",
      },
      {
        ja: "この研究の成果はこれまでに皮膚科領域の学会からも評価を得ており、学際的協力の下に進めています。",
        en: "The results of this work have been recognised by dermatology societies as well, and the research continues as an interdisciplinary collaboration.",
      },
    ],
    link: {
      href: "/allergy/research",
      label: {
        ja: "金属アレルギー研究の詳細",
        en: "More on our metal allergy research",
      },
    },
  },
  {
    id: "research05",
    title: { ja: "口腔機能とストレス", en: "Oral Function & Stress" },
    en: "Oral Function & Stress",
    images: [
      { src: "/images/research/05.jpg", width: 468, height: 260, alt: "唾液バイオマーカーの分析" },
    ],
    paragraphs: [
      {
        ja: "唾液中のバイオマーカーを用いてストレスを評価し、口腔の諸機能との相関について調査を行っています。",
        en: "We assess stress using biomarkers in saliva and investigate how it correlates with the various functions of the mouth.",
      },
      {
        ja: "「噛むこと」が心身の健康に与える影響を明らかにすることを目的とした研究です。",
        en: "The aim of this research is to clarify the effect that chewing has on physical and mental health.",
      },
    ],
  },
  {
    id: "research06",
    title: { ja: "三叉神経機能の解明", en: "Understanding Trigeminal Nerve Function" },
    en: "Trigeminal Nerve Function",
    images: [
      { src: "/images/research/06.jpg", width: 660, height: 456, alt: "三叉神経機能の研究" },
    ],
    paragraphs: [
      {
        ja: "三叉神経機能の解明を行なっています。三叉神経障害性疼痛の伝達メカニズムを研究するとともに、ボツリヌス毒素の三叉神経への効果メカニズムを解析したり、三叉神経障害性疼痛に対する新規治療法開発のためにボツリヌス毒素の応用を試みたりしています。",
        en: "We are working to understand trigeminal nerve function. Alongside research into how trigeminal neuropathic pain is transmitted, we analyse the mechanism by which botulinum toxin acts on the trigeminal nerve, and are exploring its application as a new treatment for trigeminal neuropathic pain.",
      },
      {
        ja: "また、神経再生にもチャレンジしています。",
        en: "We are also taking on the challenge of nerve regeneration.",
      },
    ],
  },
];

export const getResearchIntro = (locale: Locale) => pick(INTRO, locale);

export const getResearchSections = (locale: Locale): FeatureSection[] =>
  SECTIONS.map(({ id, title, en, images, paragraphs, link }) => ({
    id,
    title: pick(title, locale),
    en,
    images,
    paragraphs: pickAll(paragraphs, locale),
    ...(link && { link: { href: link.href, label: pick(link.label, locale) } }),
  }));
