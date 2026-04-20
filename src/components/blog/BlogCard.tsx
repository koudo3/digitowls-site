import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { BlogPostMeta } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/blog/${post.slug}`}>
      <div className="bg-white border border-border rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-[0_14px_30px_rgba(20,24,64,0.06)] h-full flex flex-col">
        <Image src={post.image} alt={post.title} width={400} height={200} className="w-full h-48 object-cover" />
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded font-medium">{post.category}</span>
            <span className="text-xs text-ink-dim/50">{post.date}</span>
          </div>
          <h3 className="font-heading font-bold text-lg mb-2 text-primary">{post.title}</h3>
          <p className="text-ink-dim text-sm flex-1">{post.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
