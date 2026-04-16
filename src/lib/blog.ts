import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPostMeta } from "./types";

const contentDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(locale: string): BlogPostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  const posts = files
    .map((filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return {
        slug: filename.replace(".mdx", ""),
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
        category: data.category || "",
        image: data.image || "/images/placeholder.webp",
        locale: data.locale || "fr",
      } as BlogPostMeta;
    })
    .filter((post) => post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    meta: {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date || "",
      category: data.category || "",
      image: data.image || "/images/placeholder.webp",
      locale: data.locale || "fr",
    } as BlogPostMeta,
    content,
  };
}
