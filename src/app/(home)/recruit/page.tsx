import type { Metadata } from "next";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { RECRUIT_INTRO, RECRUIT_QA } from "@/data/dept/recruit";

export const metadata: Metadata = {
  title: "入局案内 | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野への入局案内です。研究内容、診療、医員の業務、教室行事などについてのQ&Aを掲載しています。",
};

export default function Recruit() {
  return (
    <main className="hm-main hm-subpage">
      <PageHero en="Recruit" title="入局案内" description={RECRUIT_INTRO} />

      <div className="hm-container hm-qa-body">
        <header className="hm-heading-sm" data-reveal>
          <h2>入局希望の皆さんへ</h2>
          <span className="hm-heading-sm-en">Q&amp;A</span>
        </header>
        <div className="hm-qa-list" data-reveal-group>
          {RECRUIT_QA.map(({ q, a }) => (
            <section className="hm-qa-item" key={q} data-reveal-item>
              <h3 className="hm-qa-q">
                <span aria-hidden="true">Q</span>
                {q}
              </h3>
              <p className="hm-qa-a">
                <span aria-hidden="true">A</span>
                {a}
              </p>
            </section>
          ))}
        </div>
      </div>

      <HomeEffects />
    </main>
  );
}
