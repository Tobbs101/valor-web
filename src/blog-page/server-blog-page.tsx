import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getBlogPostByUID, getAllBlogPosts } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicBlogPage from "./prismic-blog-page";
import BlogPageBody from "./components/blog-page-body";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

interface PageProps {
  params: Promise<{ blog_slug: string }>;
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    blog_slug: post.uid,
  }));
}

/**
 * Generate metadata for individual blog post
 * Uses Prismic data if available
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { blog_slug } = await params;
  const blogPost = await getBlogPostByUID(blog_slug);

  if (blogPost) {
    const data = blogPost.data as AnyData;
    return {
      title: data.meta_title || data.title || "Blog | Valor",
      description:
        data.meta_description ||
        data.excerpt ||
        "Read this article on Valor blog.",
      keywords: data.meta_keywords || "blog, valor, car rental",
      openGraph: {
        title: data.meta_title || data.title || "Blog | Valor",
        description:
          data.meta_description ||
          data.excerpt ||
          "Read this article on Valor blog.",
        images: data.featured_image?.url
          ? [data.featured_image.url]
          : data.og_image?.url
            ? [data.og_image.url]
            : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Blog | Valor",
    description: "Read the latest articles from Valor.",
  };
}

/**
 * Individual blog post page component
 * Fetches content from Prismic if available
 */
export default async function ServerBlogPage({ params }: PageProps) {
  const { blog_slug } = await params;
  const blogPost = await getBlogPostByUID(blog_slug);

  // If no Prismic blog post found, show fallback or 404
  // For now, show the static template (you can change to notFound())
  if (!blogPost) {
    return (
      <PageLayout className="min-h-screen overflow-x-hidden w-full">
        <BlogPageBody />
        <ServerFooter />
      </PageLayout>
    );
  }

  // Fetch related posts (latest 3 posts excluding current)
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((post) => post.uid !== blog_slug)
    .slice(0, 3);

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <PrismicBlogPage post={blogPost} relatedPosts={relatedPosts} />
      <ServerFooter />
    </PageLayout>
  );
}
