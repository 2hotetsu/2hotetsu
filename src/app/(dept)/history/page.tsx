import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "教室沿革 | 顎機能咬合再建学分野" };

export default function History() {
  const html = getPageContent("history");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
