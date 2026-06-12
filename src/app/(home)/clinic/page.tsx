import type { Metadata } from "next";
import PageHero from "@/components/home/PageHero";
import HomeEffects from "@/components/home/HomeEffects";
import FeatureSections from "@/components/home/FeatureSections";
import { CLINIC_INTRO, CLINIC_SECTIONS } from "@/data/dept/clinic";

export const metadata: Metadata = {
  title: "診療内容 | 顎機能咬合再建学分野",
  description:
    "徳島大学病院 歯科（かみあわせ補綴科）の診療内容のご案内です。クラウン・ブリッジ、有床義歯、インプラント義歯、顎義歯、歯科用金属アレルギー、睡眠時無呼吸症候群治療用マウスピース、顎関節症・口腔顔面痛の治療を行っています。",
};

export default function Clinic() {
  return (
    <main className="hm-main hm-subpage">
      <PageHero en="Clinic" title="診療内容" description={CLINIC_INTRO} />

      <nav className="hm-anchor-nav" aria-label="診療内容ナビゲーション">
        <ul>
          {CLINIC_SECTIONS.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      <FeatureSections sections={CLINIC_SECTIONS} />

      <section className="hm-clinic-cta">
        <div className="hm-container">
          <div className="hm-section-head" data-reveal>
            <p className="hm-section-en">Contact</p>
            <h2 className="hm-section-title">外来診療のお問合せ</h2>
          </div>
          <div className="hm-clinic-cta-body" data-reveal>
            <p className="hm-clinic-cta-name">徳島大学病院 歯科（かみあわせ補綴科）</p>
            <p className="hm-clinic-cta-tel">
              <span>TEL</span>088-633-7371
            </p>
            <p className="hm-clinic-cta-addr">〒770-8504 徳島市蔵本町3-18-15</p>
          </div>
        </div>
      </section>

      <HomeEffects />
    </main>
  );
}
