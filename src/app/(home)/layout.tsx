import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho_B1, EB_Garamond } from "next/font/google";
import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";
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

export const metadata: Metadata = {
  title: "徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野のホームページです。我々の分野では失った歯の修復、下顎の動き、歯ぎしり、金属アレルギー、睡眠時無呼吸症、顎関節症、口腔顔面痛などに関して研究を進めるとともに、治療に結びつくように努力しています。",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
