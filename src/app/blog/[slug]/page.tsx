import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Comments } from "@/components/comments";
import { TOC } from "@/components/TOc";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import type { FC } from "react";

// 👇 Define expected params type
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function calculateReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const BlogPostPage: FC<BlogPostPageProps> = async ({ params }) => {
  const slug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black px-4 py-12">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-black mb-4">{post.meta.title}</h1>
        <p className="text-sm text-black mb-8">
          {formatDate(post.meta.date)} | {calculateReadingTime(post.content)} min read
        </p>

        <TOC />

        <div className="prose prose-zinc max-w-none text-black mb-16">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        <Comments slug={post.meta.slug} />
      </div>
    </div>
  );
};

export default BlogPostPage;
