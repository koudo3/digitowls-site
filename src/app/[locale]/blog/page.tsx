import { useTranslations, useLocale } from "next-intl";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogPage() {
  const t = useTranslations("blog_page");
  const locale = useLocale();
  const posts = getAllPosts(locale);
  return (
    <section className="py-[140px] px-8 max-md:py-20 max-md:px-5 bg-surface-2">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center">
            <span>◎</span>
            Blog
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-ink-dim max-w-2xl mx-auto font-light">
            {t("description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  );
}
