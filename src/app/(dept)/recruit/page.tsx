import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "入局案内 | 顎機能咬合再建学分野" };

export default function Recruit() {
  const html = getPageContent("recruit");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
