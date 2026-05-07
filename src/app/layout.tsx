import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野",
  description:
    "徳島大学大学院医歯薬学研究部　顎機能咬合再建学分野のホームページです。我々の分野では失った歯の修復、下顎の動き、歯ぎしり、金属アレルギー、睡眠時無呼吸症、顎関節症、口腔顔面痛などに関して研究を進めるとともに、治療に結びつくように努力しています。",
  keywords:
    "徳島大学,歯学部,補綴,二補綴,2補綴,咬合,顎機能咬合再建学分野,歯科,睡眠時無呼吸,顎関節,金属アレルギー,咬合,顎運動,疼痛,痛み,神経",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
