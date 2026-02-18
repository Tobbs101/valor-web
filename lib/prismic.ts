import { createClient } from "@/prismicio";

/**
 * Fetch the Terms and Conditions page from Prismic
 */
export async function getTermsPage() {
  const client = createClient();

  try {
    const termsPage = await client.getSingle("terms_page");
    return termsPage;
  } catch (error) {
    console.error("Error fetching terms page from Prismic:", error);
    return null;
  }
}

/**
 * Fetch the Cancellation Policy page from Prismic
 */
export async function getCancellationPolicyPage() {
  const client = createClient();

  try {
    const cancellationPage = await client.getSingle("cancellation_policy_page");
    return cancellationPage;
  } catch (error) {
    console.error(
      "Error fetching cancellation policy page from Prismic:",
      error,
    );
    return null;
  }
}

/**
 * Fetch the Privacy Policy page from Prismic
 */
// export async function getPrivacyPolicyPage() {
//   const client = createClient();

//   try {
//     const privacyPage = await client.getSingle("privacy_policy_page");
//     return privacyPage;
//   } catch (error) {
//     console.error("Error fetching privacy policy page from Prismic:", error);
//     return null;
//   }
// }

/**
 * Fetch the Site Settings (footer, social links, etc.) from Prismic
 */
export async function getSiteSettings() {
  const client = createClient();

  try {
    const siteSettings = await client.getSingle("site_settings");
    return siteSettings;
  } catch (error) {
    console.error("Error fetching site settings from Prismic:", error);
    return null;
  }
}
