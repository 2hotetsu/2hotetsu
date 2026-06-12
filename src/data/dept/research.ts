// Research themes, extracted from the legacy research.html.

import type { FeatureSection } from "@/components/home/FeatureSections";

export const RESEARCH_INTRO =
  "顎機能・咬合・口腔顔面痛などに関する研究活動をご紹介します。";

export const RESEARCH_SECTIONS: FeatureSection[] = [
  {
    id: "research01",
    title: "顎運動測定器の開発",
    en: "Jaw Movement Tracking",
    images: [
      { src: "/images/research/01.jpg", width: 400, height: 300, alt: "顎運動測定器" },
    ],
    paragraphs: [
      "磁気センサを用いて数10μmの高い精度で６自由度顎運動（下顎の上顎に対する立体的な運動）を記録する測定器の開発を行っています。",
      "下顎の動きを精密に測定することで、患者さんの顎の機能を詳細に評価し、診断するための研究を進めています。",
    ],
  },
  {
    id: "research02",
    title: "咬合可視化装置",
    en: "Occlusal Visualization",
    images: [
      { src: "/images/research/02.jpg", width: 400, height: 285, alt: "咬合可視化装置" },
    ],
    paragraphs: [
      "食事中など機能時や睡眠ブラキシズム時における上下の歯の接触状態（咬合）をコンピュータグラフィックスで観察することで、咬合についての客観的な診断や評価を可能にする「咬合可視化装置」の開発を行っています。",
      "機能運動時の咬合接触を明示することで、これまでは患者さんの感覚に頼っていた「噛みやすさ」に対する評価を、目に見える形で客観的に分析することが可能になります。",
    ],
  },
  {
    id: "research03",
    title: "睡眠ブラキシズム",
    en: "Sleep Bruxism",
    images: [
      { src: "/images/research/03.jpg", width: 400, height: 282, alt: "睡眠ブラキシズムの測定" },
    ],
    paragraphs: [
      "ブラキシズム（歯ぎしり）に伴う咀嚼筋の活動や下顎の動きを測定することで、ブラキシズムの診断と治療法の開発を目指す研究です。",
      "睡眠中の顎の動きを分析することで、歯や顎の障害を引き起こすブラキシズムの発生メカニズムとその防止法についての解析を進めています。",
    ],
  },
  {
    id: "research04",
    title: "歯科用金属アレルギー",
    en: "Dental Metal Allergy",
    images: [
      { src: "/images/research/04.jpg", width: 400, height: 300, alt: "蛍光エックス線分析装置" },
    ],
    paragraphs: [
      "口腔内の修復物に含まれる金属元素の分析に用いる蛍光エックス線分析装置です。パッチテストにより判定したアレルゲンが、どの修復物に含まれるかを調査するために使用します。",
      "この研究の成果はこれまでに皮膚科領域の学会からも評価を得ており、学際的協力の下に進めています。",
    ],
    link: { href: "/allergy/ja/research", label: "金属アレルギー研究の詳細" },
  },
  {
    id: "research05",
    title: "口腔機能とストレス",
    en: "Oral Function & Stress",
    images: [
      { src: "/images/research/05.jpg", width: 468, height: 260, alt: "唾液バイオマーカーの分析" },
    ],
    paragraphs: [
      "唾液中のバイオマーカーを用いてストレスを評価し、口腔の諸機能との相関について調査を行っています。",
      "「噛むこと」が心身の健康に与える影響を明らかにすることを目的とした研究です。",
    ],
  },
  {
    id: "research06",
    title: "三叉神経機能の解明",
    en: "Trigeminal Nerve Function",
    images: [
      { src: "/images/research/06.jpg", width: 660, height: 456, alt: "三叉神経機能の研究" },
    ],
    paragraphs: [
      "三叉神経機能の解明を行なっています。三叉神経障害性疼痛の伝達メカニズムを研究するとともに、ボツリヌス毒素の三叉神経への効果メカニズムを解析したり、三叉神経障害性疼痛に対する新規治療法開発のためにボツリヌス毒素の応用を試みたりしています。",
      "また、神経再生にもチャレンジしています。",
    ],
  },
];
