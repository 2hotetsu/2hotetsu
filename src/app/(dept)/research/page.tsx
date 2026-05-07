import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "研究内容 | 顎機能咬合再建学分野" };

export default function Research() {
  const html = getPageContent("research");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
