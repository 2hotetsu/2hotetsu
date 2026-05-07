import { getPageContent } from "@/lib/dept/getPageContent";

export const metadata = { title: "診療内容 | 顎機能咬合再建学分野" };

export default function Clinic() {
  const html = getPageContent("clinic");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
