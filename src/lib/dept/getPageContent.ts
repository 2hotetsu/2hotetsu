import { readFileSync } from "fs";
import { join } from "path";

export function getPageContent(page: string): string {
  const filePath = join(process.cwd(), "src", "data", "dept", `${page}.html`);
  return readFileSync(filePath, "utf-8");
}
