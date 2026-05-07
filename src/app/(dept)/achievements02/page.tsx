import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "業績集 II | 顎機能咬合再建学分野" };

export default function Achievements02() {
  const html = getPageContent("achievements02");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
