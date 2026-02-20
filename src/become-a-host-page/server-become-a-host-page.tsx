import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getBecomeAHostPage } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicBecomeAHostPage from "./prismic-become-a-host-page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

/**
 * Generate metadata for the Become a Host page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getBecomeAHostPage();

  if (page) {
    const data = page.data as AnyData;
    return {
      title: data.meta_title || "Become a Host - Share Your Ride with Valor",
      description:
        data.meta_description ||
        "Join Valor as a host and offer your premium car rentals across Nigeria. Connect with trusted renters and grow your business today.",
      keywords:
        data.meta_keywords ||
        "become a host, valor, car rental, host, earn, vehicle, Nigeria",
      openGraph: {
        title: data.meta_title || "Become a Host - Share Your Ride with Valor",
        description:
          data.meta_description ||
          "Join Valor as a host and offer your premium car rentals across Nigeria. Connect with trusted renters and grow your business today.",
        images: data.og_image?.url ? [data.og_image.url] : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Become a Host - Share Your Ride with Valor",
    description:
      "Join Valor as a host and offer your premium car rentals across Nigeria. Connect with trusted renters and grow your business today.",
    keywords: "become a host, valor, car rental, host, earn, vehicle, Nigeria",
  };
}

/**
 * Become a Host page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerBecomeAHostPage() {
  const page = await getBecomeAHostPage();

  // Transform Prismic data to match BecomeAHostPageData type
  const transformedData = page?.data ? transformPrismicData(page.data) : {};

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <PrismicBecomeAHostPage data={transformedData} />
      <ServerFooter />
    </PageLayout>
  );
}

function transformPrismicData(data: AnyData) {
  return {
    ...data,
    top_hosts: data.top_hosts?.map((host: AnyData) => ({
      ...host,
      host_trips: host.host_trips ?? undefined,
    })),
  };
}
