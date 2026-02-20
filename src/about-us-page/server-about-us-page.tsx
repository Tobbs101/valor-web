import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getAboutUsPage } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicAboutUsPage from "./prismic-about-us-page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

/**
 * Generate metadata for the About Us page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutUsPage();

  if (aboutPage) {
    const data = aboutPage.data as AnyData;
    return {
      title: data.meta_title || "About Us - Learn More About Valor",
      description:
        data.meta_description ||
        "Discover the story behind Valor, our mission, and the team dedicated to providing exceptional car rental experiences across Nigeria.",
      keywords:
        data.meta_keywords ||
        "about, valor, car rental, mission, vision, story, values",
      openGraph: {
        title: data.meta_title || "About Us - Learn More About Valor",
        description:
          data.meta_description ||
          "Discover the story behind Valor, our mission, and the team dedicated to providing exceptional car rental experiences across Nigeria.",
        images: data.og_image?.url ? [data.og_image.url] : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "About Us - Learn More About Valor",
    description:
      "Discover the story behind Valor, our mission, and the team dedicated to providing exceptional car rental experiences across Nigeria.",
    keywords: "about, valor, car rental, mission, vision, story, values",
  };
}

/**
 * About Us page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerAboutUsPage() {
  const aboutPage = await getAboutUsPage();

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <PrismicAboutUsPage data={aboutPage?.data ?? {}} />
      <ServerFooter />
    </PageLayout>
  );
}
