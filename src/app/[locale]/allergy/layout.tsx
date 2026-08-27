import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/siteConfig";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== "en";

  const title = isJa
    ? "歯科用金属アレルギー外来 | 徳島大学病院"
    : "Dental Metal Allergy Clinic | Tokushima University Hospital";
  const description = isJa
    ? "徳島大学病院 歯科用金属アレルギー外来。歯科用金属が原因のアレルギー症状（皮膚炎・湿疹・口内炎など）の診断・パッチテスト・治療を行う専門外来です。"
    : "Tokushima University Hospital Dental Metal Allergy Clinic. We provide diagnosis, patch testing, and treatment for allergic reactions caused by dental metals (dermatitis, eczema, oral mucosal lesions).";

  return {
    title: {
      default: title,
      template: isJa
        ? `%s | 歯科用金属アレルギー外来 | 徳島大学病院`
        : `%s | Dental Metal Allergy Clinic | Tokushima University Hospital`,
    },
    description,
    keywords: isJa
      ? "金属アレルギー,歯科金属アレルギー,パッチテスト,徳島大学病院,歯科アレルギー外来,金属アレルギー外来,歯科用金属,アレルギー検査,皮膚炎,湿疹,口内炎,徳島,アレルギー治療"
      : "dental metal allergy, metal allergy, patch test, Tokushima University Hospital, dental allergy clinic, metal allergy diagnosis",
    openGraph: {
      type: "website",
      locale: isJa ? "ja_JP" : "en_US",
      alternateLocale: isJa ? "en_US" : "ja_JP",
      siteName: isJa ? "歯科用金属アレルギー外来 | 徳島大学病院" : "Dental Metal Allergy Clinic | Tokushima University Hospital",
    },
    alternates: {
      languages: {
        ja: `${SITE_URL}/allergy/ja`,
        en: `${SITE_URL}/allergy/en`,
      },
    },
  };
}

export default async function AllergyLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!["en", "ja"].includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable}`}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
