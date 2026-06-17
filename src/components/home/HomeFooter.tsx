import Link from "next/link";

const FOOTER_NAV = [
  { href: "/staff", label: "スタッフ" },
  { href: "/topics", label: "トピックス" },
  { href: "/clinic", label: "診療内容" },
  { href: "/research", label: "研究内容" },
  { href: "/education", label: "教育内容" },
  { href: "/recruit", label: "入局案内" },
  { href: "/history", label: "教室沿革" },
  { href: "/achievements", label: "業績集" },
];

export default function HomeFooter() {
  return (
    <footer className="hm-footer">
      <div className="hm-footer-inner">
        <div className="hm-footer-brand">
          <p className="hm-footer-sup">徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系</p>
          <p className="hm-footer-name">顎機能咬合再建学分野</p>
          <p className="hm-footer-en">
            Department of Stomatognathic Function and Occlusal Reconstruction
          </p>
        </div>

        <div className="hm-footer-cols">
          <nav className="hm-footer-nav" aria-label="フッターナビゲーション">
            <ul>
              {FOOTER_NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hm-footer-contact">
            <p className="hm-footer-label">外来診療のお問合せ</p>
            <p>
              徳島大学病院 歯科（かみあわせ補綴科）
              <br />
              〒770-8504 徳島市蔵本町3-18-15
              <br />
              TEL 088-633-7371
            </p>
          </div>
        </div>
      </div>

      <div className="hm-footer-bottom">
        <small>
          &copy; Department of Stomatognathic Function and Occlusal Reconstruction,
          Tokushima University. All rights reserved.
        </small>
        <a href="#top" className="hm-pagetop" aria-label="ページ上部へ戻る">
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
