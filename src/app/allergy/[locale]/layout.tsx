import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";
import { routing } from "@/i18n/routing";

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

export const metadata: Metadata = {
  title: "歯科用金属アレルギー外来 | 徳島大学病院",
  description:
    "徳島大学病院 歯科用金属アレルギー外来。歯科金属が原因のアレルギー症状の診断・治療を行っています。",
};

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
