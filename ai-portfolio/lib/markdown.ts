import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export async function getPost(slug: string) {
  const filePath = path.join(contentDir, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    ...data,
    contentHtml: processed.toString(),
  };
}
