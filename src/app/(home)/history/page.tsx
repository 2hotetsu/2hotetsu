import type { Metadata } from "next";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import { HISTORY_ITEMS } from "@/data/dept/history";

export const metadata: Metadata = {
  title: "教室沿革 | 顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野（旧 歯科補綴学第二講座）の沿革です。昭和54年の講座設置から現在までの歩みをご紹介します。",
};

export default function History() {
  return (
    <main className="hm-main hm-subpage">
      <PageHero
        en="History"
        title="教室沿革"
        description="昭和54年の歯科補綴学第二講座設置から現在までの歩みです。"
      />

      <div className="hm-container hm-tl-body">
        <ol className="hm-timeline" data-reveal-group>
          {HISTORY_ITEMS.map(({ year, era, text }, i) => {
            const showYear = i === 0 || HISTORY_ITEMS[i - 1].year !== year;
            return (
              <li className="hm-tl-item" key={`${era}-${text}`} data-reveal-item>
                <div className="hm-tl-year">{showYear ? year : ""}</div>
                <div className="hm-tl-node" aria-hidden="true" />
                <div className="hm-tl-content">
                  <p className="hm-tl-era">{era}</p>
                  <p className="hm-tl-text">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <HomeEffects />
    </main>
  );
}
