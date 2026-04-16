import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BlogPostMeta } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const locale = useLocale();
  return (
    <AnimatedSection>
      <Link href={`/${locale}/blog/${post.slug}`}>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-secondary/50 transition-colors">
          <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{post.category}</span>
              <span className="text-xs text-white/40">{post.date}</span>
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">{post.title}</h3>
            <p className="text-white/60 text-sm">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
