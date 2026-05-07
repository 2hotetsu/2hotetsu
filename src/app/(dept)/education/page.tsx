import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "教育内容 | 顎機能咬合再建学分野" };

export default function Education() {
  const html = getPageContent("education");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
