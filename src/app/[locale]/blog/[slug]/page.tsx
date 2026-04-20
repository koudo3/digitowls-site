import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";

export async function generateStaticParams() {
  const frPosts = getAllPosts("fr");
  const enPosts = getAllPosts("en");
  return [...frPosts, ...enPosts].map((post) => ({ locale: post.locale, slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{post.meta.category}</span>
          <span className="text-xs text-ink-dim/50 ml-3">{post.meta.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">{post.meta.title}</h1>
        <Image src={post.meta.image} alt={post.meta.title} width={800} height={400} className="w-full rounded-xl mb-8 object-cover" />
        <div>
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
