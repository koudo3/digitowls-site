import { useTranslations, useLocale } from "next-intl";
import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage() {
  const t = useTranslations("blog_page");
  const locale = useLocale();
  const posts = getAllPosts(locale);
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t("title")} description={t("description")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  );
}
