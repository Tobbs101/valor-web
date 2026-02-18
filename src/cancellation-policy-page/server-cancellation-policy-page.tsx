import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getCancellationPolicyPage } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicCancellationPolicyPage from "./prismic-cancellation-policy-page";
import CancellationPolicyPageBody from "./components/cancellation-policy-page-body";

/**
 * Generate metadata for the Cancellation Policy page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const cancellationPage = await getCancellationPolicyPage();

  if (cancellationPage) {
    return {
      title: cancellationPage.data.meta_title || "Cancellation Policy | Valor",
      description:
        cancellationPage.data.meta_description ||
        "Cancellation and Refund Policy for Valorhire Technologies Limited platform and services.",
      keywords:
        cancellationPage.data.meta_keywords ||
        "cancellation, refund, policy, valor, car rental",
      openGraph: {
        title:
          cancellationPage.data.meta_title || "Cancellation Policy | Valor",
        description:
          cancellationPage.data.meta_description ||
          "Cancellation and Refund Policy for Valorhire Technologies Limited platform and services.",
        images: cancellationPage.data.og_image?.url
          ? [cancellationPage.data.og_image.url]
          : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Cancellation Policy | Valor",
    description:
      "Cancellation and Refund Policy for Valorhire Technologies Limited platform and services.",
    keywords: "cancellation, refund, policy, valor, car rental",
  };
}

/**
 * Cancellation Policy page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerCancellationPolicyPage() {
  const cancellationPage = await getCancellationPolicyPage();

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      {cancellationPage ? (
        <PrismicCancellationPolicyPage data={cancellationPage.data} />
      ) : (
        <CancellationPolicyPageBody />
      )}
      <ServerFooter />
    </PageLayout>
  );
}
