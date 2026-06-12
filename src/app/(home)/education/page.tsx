import type { Metadata } from "next";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { EDUCATION_INTRO, EDUCATION_MATERIALS } from "@/data/dept/education";

export const metadata: Metadata = {
  title: "教育内容 | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野の教育内容のご案内です。主に固定性義歯を用いた補綴治療についての教育を行っています。",
};

export default function Education() {
  return (
    <main className="hm-main hm-subpage">
      <PageHero en="Education" title="教育内容" description={EDUCATION_INTRO} />

      <div className="hm-container hm-edu-body">
        <section data-reveal>
          <header className="hm-heading-sm">
            <h2>講義資料</h2>
            <span className="hm-heading-sm-en">Lecture Materials</span>
          </header>
          <p className="hm-prose">
            学生・教室員向けの講義資料を下記のページで公開しています。
          </p>
          <div className="hm-edu-link">
            <a
              href={EDUCATION_MATERIALS.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hm-link-card"
            >
              <span className="hm-link-jp">{EDUCATION_MATERIALS.jp}</span>
              <span className="hm-link-en">{EDUCATION_MATERIALS.en}</span>
              <span className="hm-link-mark" aria-hidden="true">↗</span>
            </a>
            <p className="hm-edu-note">※ {EDUCATION_MATERIALS.note}</p>
          </div>
        </section>
      </div>

      <HomeEffects />
    </main>
  );
}
