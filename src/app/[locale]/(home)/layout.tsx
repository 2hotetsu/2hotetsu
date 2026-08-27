import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho_B1, EB_Garamond } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";
import { localeUrl } from "@/lib/siteConfig";
import "./home.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-hm-sans",
});

const mincho = Shippori_Mincho_B1({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-hm-mincho",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-hm-en",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dept" });

  return {
    title: {
      default: t("meta.homeTitle"),
      template: `%s | ${t("brand.main")}`,
    },
    description: t("meta.homeDesc"),
    alternates: {
      canonical: localeUrl(locale, "/"),
      languages: {
        ja: localeUrl("ja", "/"),
        en: localeUrl("en", "/"),
      },
    },
  };
}

export default async function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div
      id="top"
      className={`hm-root ${notoSans.variable} ${mincho.variable} ${garamond.variable}`}
    >
      <HomeHeader />
      {children}
      <HomeFooter />
    </div>
  );
}
