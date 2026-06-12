import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/home/HeroSlider";
import HomeNews from "@/components/home/HomeNews";
import HomeEffects from "@/components/home/HomeEffects";

const HERO_SLIDES = [
  { src: "/images/mainimg06.jpg", alt: "顎機能咬合再建学分野" },
  { src: "/images/mainimg04.jpg", alt: "顎機能咬合再建学分野" },
  { src: "/images/mainimg05.jpg", alt: "顎機能咬合再建学分野" },
  { src: "/images/mainimg02.jpg", alt: "顎機能咬合再建学分野" },
  { src: "/images/mainimg03.jpg", alt: "顎機能咬合再建学分野" },
];

const SECTION_CARDS = [
  {
    href: "/staff",
    img: "/images/mainimg06.jpg",
    jp: "スタッフ",
    en: "Staff",
    desc: "教授をはじめ、当分野に所属するスタッフをご紹介します。",
  },
  {
    href: "/clinic",
    img: "/images/clinic/01.jpg",
    jp: "診療内容",
    en: "Clinic",
    desc: "かみあわせ補綴科での診療内容と専門外来のご案内です。",
  },
  {
    href: "/research",
    img: "/images/research/01.jpg",
    jp: "研究内容",
    en: "Research",
    desc: "顎機能・咬合・口腔顔面痛などに関する研究活動をご紹介します。",
  },
  {
    href: "/education",
    img: "/images/mainimg05.jpg",
    jp: "教育内容",
    en: "Education",
    desc: "学部教育から大学院教育まで、当分野の教育方針をご案内します。",
  },
  {
    href: "/recruit",
    img: "/images/mainimg02.jpg",
    jp: "入局案内",
    en: "Recruit",
    desc: "当分野への入局をお考えの方へ。研修・キャリアのご案内です。",
  },
  {
    href: "/history",
    img: "/images/mainimg03.jpg",
    jp: "教室沿革",
    en: "History",
    desc: "開講から現在に至るまでの教室の歩みをご紹介します。",
  },
];

const RELATED_LINKS = [
  {
    href: "http://www.tokushima-hosp.jp/",
    external: true,
    jp: "徳島大学病院",
    en: "Tokushima University Hospital",
  },
  {
    href: "/allergy/ja",
    external: false,
    jp: "歯科用金属アレルギー外来",
    en: "Dental Metal Allergy Clinic",
  },
  {
    href: "http://www.tokushima-u.ac.jp/dent/",
    external: true,
    jp: "徳島大学歯学部・大学院",
    en: "Faculty of Dentistry, Tokushima University",
  },
];

export default function Home() {
  return (
    <main className="hm-main">
      <HeroSlider slides={HERO_SLIDES} />

      {/* ── Greeting ─────────────────────────────────────────── */}
      <section className="hm-section">
        <div className="hm-container hm-greeting-grid">
          <div className="hm-greeting-photo" data-reveal>
            <Image
              src="/images/matuka.jpg"
              alt="顎機能咬合再建学分野教授　松香 芳三"
              width={300}
              height={300}
            />
          </div>
          <div className="hm-greeting-body">
            <div className="hm-section-head" data-reveal>
              <p className="hm-section-en">Greeting</p>
              <h2 className="hm-section-title">ごあいさつ</h2>
            </div>
            <p className="hm-greeting-text" data-reveal>
              顎機能咬合再建学分野は歯科補綴（ほてつ）学の一分野であり、補綴とは歯が大きく欠けたり、なくなった場合にかぶせものや入れ歯などで補うことであります。歯を失うと食物が食べにくかったり、発音しにくかったりと、日常生活に支障をきたします。言及するまでもありませんが、食べることは人間生活の基本であり、良く食べることは非常に大切です。そのため、我々の分野では失った歯をどのように修復するのか、顎がどのように動くのか、夜間の歯ぎしり運動はどのようになされているのか、金属アレルギーはどのような状態であるのか、顎関節症や口腔顔面痛はどのように診断・治療するのかなどに関して研究を進めるとともに、治療に結びつくように努力しています。これらの研究や臨床は良く噛むことにつながり、人類の幸福に寄与することができるものと期待しております。その他にも徳島大学病院の他の科や専門外来と連携しながら最新の治療を提供したいと考えております。インフォームドコンセントに基づく患者さん中心の医療・質の高い補綴治療をスタッフ一同で提供して行くつもりです。
            </p>
            <p className="hm-greeting-sign" data-reveal>
              <span>顎機能咬合再建学分野教授</span>松香 芳三
            </p>
          </div>
        </div>
      </section>

      {/* ── News ─────────────────────────────────────────────── */}
      <section className="hm-section hm-news" id="news">
        <div className="hm-container">
          <div className="hm-section-head" data-reveal>
            <p className="hm-section-en">News</p>
            <h2 className="hm-section-title">新着情報</h2>
          </div>
          <HomeNews />
          <div className="hm-news-more" data-reveal>
            <Link href="/topics" className="hm-btn">
              一覧を見る<span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Department sections ──────────────────────────────── */}
      <section className="hm-section hm-dept">
        <div className="hm-container">
          <div className="hm-section-head" data-reveal>
            <p className="hm-section-en">Department</p>
            <h2 className="hm-section-title">分野案内</h2>
          </div>
          <div className="hm-card-grid" data-reveal-group>
            {SECTION_CARDS.map(({ href, img, jp, en, desc }) => (
              <Link href={href} className="hm-card" key={href} data-reveal-item>
                <div className="hm-card-img">
                  <Image src={img} alt={jp} fill sizes="(max-width: 720px) 100vw, 33vw" />
                </div>
                <div className="hm-card-body">
                  <p className="hm-card-en">{en}</p>
                  <h3 className="hm-card-title">{jp}</h3>
                  <p className="hm-card-desc">{desc}</p>
                  <span className="hm-card-arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related links ─────────────────────────────────────── */}
      <section className="hm-section hm-links">
        <div className="hm-container">
          <div className="hm-section-head" data-reveal>
            <p className="hm-section-en">Links</p>
            <h2 className="hm-section-title">関連リンク</h2>
          </div>
          <ul className="hm-links-grid" data-reveal-group>
            {RELATED_LINKS.map(({ href, external, jp, en }) => (
              <li key={href} data-reveal-item>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hm-link-card">
                    <span className="hm-link-jp">{jp}</span>
                    <span className="hm-link-en">{en}</span>
                    <span className="hm-link-mark" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link href={href} className="hm-link-card">
                    <span className="hm-link-jp">{jp}</span>
                    <span className="hm-link-en">{en}</span>
                    <span className="hm-link-mark" aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* must live inside the page segment: if mounted from the layout, its
          GSAP writes race the page's hydration and React discards the styled
          DOM (hydration mismatch) */}
      <HomeEffects />
    </main>
  );
}
