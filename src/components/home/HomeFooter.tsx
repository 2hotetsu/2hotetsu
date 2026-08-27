import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const FOOTER_NAV = [
  { href: "/staff", key: "staff" },
  { href: "/topics", key: "topics" },
  { href: "/clinic", key: "clinic" },
  { href: "/research", key: "research" },
  { href: "/education", key: "education" },
  { href: "/recruit", key: "recruit" },
  { href: "/history", key: "history" },
  { href: "/achievements", key: "achievements" },
] as const;

export default async function HomeFooter() {
  const t = await getTranslations("Dept");

  return (
    <footer className="hm-footer">
      <div className="hm-footer-inner">
        <div className="hm-footer-brand">
          <p className="hm-footer-sup">{t("brand.sup")}</p>
          <p className="hm-footer-name">{t("brand.main")}</p>
          {t("brand.en") && <p className="hm-footer-en">{t("brand.en")}</p>}
        </div>

        <div className="hm-footer-cols">
          <nav className="hm-footer-nav" aria-label={t("nav.ariaFooter")}>
            <ul>
              {FOOTER_NAV.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href}>{t(`nav.${key}`)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hm-footer-contact">
            <p className="hm-footer-label">{t("footer.contactLabel")}</p>
            <p>
              {t("footer.clinicName")}
              <br />
              {t("footer.address")}
              <br />
              {t("footer.tel")}
            </p>
          </div>
        </div>
      </div>

      <div className="hm-footer-bottom">
        <small>
          &copy; Department of Stomatognathic Function and Occlusal Reconstruction,
          Tokushima University. All rights reserved.
        </small>
        <a href="#top" className="hm-pagetop" aria-label={t("nav.pageTop")}>
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
