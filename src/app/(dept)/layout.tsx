import type { Metadata } from "next";
import Script from "next/script";
import DeptNav from "@/components/dept/DeptNav";
import DeptFooter from "@/components/dept/DeptFooter";
import DeptScripts from "@/components/dept/DeptScripts";
import "./dept.css";

export const metadata: Metadata = {
  title: "徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野のホームページです。我々の分野では失った歯の修復、下顎の動き、歯ぎしり、金属アレルギー、睡眠時無呼吸症、顎関節症、口腔顔面痛などに関して研究を進めるとともに、治療に結びつくように努力しています。",
};

export default function DeptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <DeptNav />
      {children}
      <DeptFooter />
      {/* jQuery carregado primeiro (blocking), plugins em sequência via DeptScripts */}
      <Script src="/js-dept/jquery-1.8.2.min.js" strategy="beforeInteractive" />
      <DeptScripts />
    </>
  );
}
