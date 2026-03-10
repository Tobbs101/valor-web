import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getLandingPage } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicLandingPage from "./prismic-landing-page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

/**
 * Generate metadata for the Landing page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const landingPage = await getLandingPage();

  if (landingPage) {
    const data = landingPage.data as AnyData;
    return {
      title:
        data.meta_title || "Welcome to Valor - Premium Car Rentals in Nigeria",
      description:
        data.meta_description ||
        "Discover premium car rentals from trusted hosts across Nigeria with Valor. Handpicked vehicles, seamless booking, and exceptional service await you.",
      keywords:
        data.meta_keywords || "valor, car rental, Nigeria, premium, hire",
      openGraph: {
        title:
          data.meta_title ||
          "Welcome to Valor - Premium Car Rentals in Nigeria",
        description:
          data.meta_description ||
          "Discover premium car rentals from trusted hosts across Nigeria with Valor.",
        images: data.og_image?.url ? [data.og_image.url] : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Welcome to Valor - Premium Car Rentals in Nigeria",
    description:
      "Discover premium car rentals from trusted hosts across Nigeria with Valor. Handpicked vehicles, seamless booking, and exceptional service await you.",
    keywords: "valor, car rental, Nigeria, premium, hire",
  };
}

/**
 * Landing page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerLandingPage() {
  const landingPage = await getLandingPage();

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <PrismicLandingPage data={landingPage?.data ?? {}} />
      <ServerFooter />
    </PageLayout>
  );
}
