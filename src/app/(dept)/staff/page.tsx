import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "スタッフ | 顎機能咬合再建学分野" };

export default function Staff() {
  const html = getPageContent("staff");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
