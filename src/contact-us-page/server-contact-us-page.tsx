import ServerFooter from "@/components/layout/server-footer";
import PageLayout from "@/components/layout/page-layout";
import { getContactUsPage } from "@/lib/prismic";
import { Metadata } from "next";
import PrismicContactUsPage from "./prismic-contact-us-page";
import ContactUsPageBody from "./components/contact-us-page-body";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyData = any;

/**
 * Generate metadata for the Contact Us page
 * Uses Prismic data if available, otherwise falls back to defaults
 */
export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactUsPage();

  if (contactPage) {
    const data = contactPage.data as AnyData;
    return {
      title: data.meta_title || "Contact Us | Valor",
      description:
        data.meta_description ||
        "Reach out to Valor for any inquiries, support, or feedback.",
      keywords:
        data.meta_keywords || "contact, valor, car rental, support, inquiries",
      openGraph: {
        title: data.meta_title || "Contact Us | Valor",
        description:
          data.meta_description ||
          "Reach out to Valor for any inquiries, support, or feedback.",
        images: data.og_image?.url ? [data.og_image.url] : [],
      },
    };
  }

  // Fallback metadata
  return {
    title: "Contact Us | Valor",
    description:
      "Reach out to Valor for any inquiries, support, or feedback. We're here to help you with your premium car rental experience across Nigeria.",
    keywords: "contact, valor, car rental, support, inquiries",
  };
}

/**
 * Contact Us page component
 * Fetches content from Prismic if available, otherwise shows static content
 */
export default async function ServerContactUsPage() {
  const contactPage = await getContactUsPage();

  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      {contactPage ? (
        <PrismicContactUsPage data={contactPage.data} />
      ) : (
        <ContactUsPageBody />
      )}
      <ServerFooter />
    </PageLayout>
  );
}
