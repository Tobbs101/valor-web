import { getSiteSettings } from "@/lib/prismic";
import PrismicFooter from "./prismic-footer";

/**
 * Server-side Footer component
 * Fetches site settings from Prismic and renders the footer
 * Falls back to static content if Prismic data is unavailable
 */
export default async function ServerFooter() {
  const siteSettings = await getSiteSettings();

  return <PrismicFooter data={siteSettings?.data} />;
}
