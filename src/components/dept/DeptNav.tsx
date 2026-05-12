"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/",            img: "nav01", alt: "HOME" },
  { href: "/staff",       img: "nav02", alt: "スタッフ" },
  { href: "/topics",      img: "nav03", alt: "トピックス" },
  { href: "/clinic",      img: "nav04", alt: "診療内容" },
  { href: "/research",    img: "nav05", alt: "研究内容" },
  { href: "/education",   img: "nav06", alt: "教育内容" },
  { href: "/recruit",     img: "nav07", alt: "入局案内" },
  { href: "/history",     img: "nav08", alt: "教室沿革" },
  { href: "/achievements",img: "nav09", alt: "業績集" },
];

export default function DeptNav() {
  const pathname = usePathname();

  return (
    <>
      <div id="hd" className="clearfix">
        <div id="hd_cont">
          <h1>
            <Link href="/">
              <Image
                src="/images/h1.jpg"
                alt="徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野"
                width={752}
                height={95}
                priority
              />
            </Link>
          </h1>
        </div>
      </div>

      <div id="nav" className="nav-desktop">
        <div id="nav_cont">
          <ul>
            {navItems.map(({ href, img, alt }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              const src = `/images/${isActive ? img + "_ov" : img}.jpg`;
              return (
                <li key={href}>
                  <Link href={href}>
                    <Image
                      src={src}
                      alt={alt}
                      width={113}
                      height={60}
                      className="hoverImg"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <nav className="nav-mobile">
        <ul>
          {navItems.map(({ href, alt }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href} className={isActive ? "active" : ""}>
                <Link href={href}>{alt}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
