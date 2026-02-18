import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getBlogListingPage, getAllBlogPosts } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicBlogsPage from "./prismic-blogs-page";
import BlogsPageBody from "./components/blogs-page-body";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

/**
 * Generate metadata for the Blogs listing page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const blogListing = await getBlogListingPage();

  if (blogListing) {
    const data = blogListing.data as AnyData;
    return {
      title: data.meta_title || "Blog | Valor",
      description:
        data.meta_description ||
        "Read the latest articles, updates, and insights from Valor.",
      keywords:
        data.meta_keywords || "blog, valor, car rental, articles, insights",
      openGraph: {
        title: data.meta_title || "Blog | Valor",
        description:
          data.meta_description ||
          "Read the latest articles, updates, and insights from Valor.",
        images: data.og_image?.url ? [data.og_image.url] : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Blog | Valor",
    description: "Read the latest articles, updates, and insights from Valor.",
    keywords: "blog, valor, car rental, articles, insights",
  };
}

/**
 * Blog listing page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerBlogsPage() {
  const [blogListing, blogPosts] = await Promise.all([
    getBlogListingPage(),
    getAllBlogPosts(),
  ]);

  // If we have Prismic blog posts, use the Prismic component
  if (blogPosts && blogPosts.length > 0) {
    return (
      <PageLayout className="min-h-screen overflow-x-hidden w-full">
        <PrismicBlogsPage listingData={blogListing?.data} posts={blogPosts} />
        <ServerFooter />
      </PageLayout>
    );
  }

  // Fallback to static content
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <BlogsPageBody />
      <ServerFooter />
    </PageLayout>
  );
}
