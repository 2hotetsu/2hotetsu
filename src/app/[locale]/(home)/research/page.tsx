import type { Metadata } from "next";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import FeatureSections from "@/components/home/FeatureSections";
import { RESEARCH_INTRO, RESEARCH_SECTIONS } from "@/data/dept/research";

export const metadata: Metadata = {
  title: "研究内容 | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野の研究内容のご紹介です。顎運動測定器の開発、咬合可視化装置、睡眠ブラキシズム、歯科用金属アレルギー、口腔機能とストレス、三叉神経機能の解明などの研究を行っています。",
};

export default function Research() {
  return (
    <main className="hm-main hm-subpage">
      <PageHero en="Research" title="研究内容" description={RESEARCH_INTRO} />

      <nav className="hm-anchor-nav" aria-label="研究内容ナビゲーション">
        <ul>
          {RESEARCH_SECTIONS.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <FeatureSections sections={RESEARCH_SECTIONS} />

      <HomeEffects />
    </main>
  );
}
