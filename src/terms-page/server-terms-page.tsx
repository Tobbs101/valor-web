import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getTermsPage } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicTermsPage from "./prismic-terms-page";
import TermsPageBody from "./components/terms-page-body";

/**
 * Generate metadata for the Terms and Conditions page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const termsPage = await getTermsPage();

  if (termsPage) {
    return {
      title: termsPage.data.meta_title || "Terms and Conditions | Valor",
      description:
        termsPage.data.meta_description ||
        "Terms and Conditions for using Valorhire Technologies Limited platform and services.",
      keywords:
        termsPage.data.meta_keywords ||
        "terms, conditions, valor, car rental, policy",
      openGraph: {
        title: termsPage.data.meta_title || "Terms and Conditions | Valor",
        description:
          termsPage.data.meta_description ||
          "Terms and Conditions for using Valorhire Technologies Limited platform and services.",
        images: termsPage.data.og_image?.url
          ? [termsPage.data.og_image.url]
          : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Terms and Conditions | Valor",
    description:
      "Terms and Conditions for using Valorhire Technologies Limited platform and services.",
    keywords: "terms, conditions, valor, car rental, policy",
  };
}

/**
 * Terms and Conditions page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerTermsPage() {
  const termsPage = await getTermsPage();

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      {termsPage ? (
        <PrismicTermsPage data={termsPage.data} />
      ) : (
        <TermsPageBody />
      )}
      <ServerFooter />
    </PageLayout>
  );
}
