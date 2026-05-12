import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "業績集 | 顎機能咬合再建学分野" };

export default function Achievements() {
  const html = getPageContent("achievements");
  return <div className="has-sidebar" dangerouslySetInnerHTML={{ __html: html }} />;
}
