import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "トピックス | 顎機能咬合再建学分野" };

export default function Topics() {
  const html = getPageContent("topics");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
