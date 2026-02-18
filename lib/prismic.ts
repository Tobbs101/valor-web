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

/**
 * Fetch the Blog Listing page settings from Prismic
 */
export async function getBlogListingPage() {
  const client = createClient();

  try {
    const blogListing = await client.getSingle("blog_listing_page");
    return blogListing;
  } catch (error) {
    console.error("Error fetching blog listing page from Prismic:", error);
    return null;
  }
}

/**
 * Fetch all published blog posts from Prismic
 */
export async function getAllBlogPosts() {
  const client = createClient();

  try {
    const blogPosts = await client.getAllByType("blog_post", {
      orderings: [
        { field: "my.blog_post.publish_date", direction: "desc" },
        { field: "document.first_publication_date", direction: "desc" },
      ],
    });
    return blogPosts;
  } catch (error) {
    console.error("Error fetching blog posts from Prismic:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by UID (slug)
 */
export async function getBlogPostByUID(uid: string) {
  const client = createClient();

  try {
    const blogPost = await client.getByUID("blog_post", uid);
    return blogPost;
  } catch (error) {
    console.error(`Error fetching blog post "${uid}" from Prismic:`, error);
    return null;
  }
}

/**
 * Fetch the Contact Us page from Prismic
 */
export async function getContactUsPage() {
  const client = createClient();

  try {
    const contactPage = await client.getSingle("contact_us_page");
    return contactPage;
  } catch (error) {
    console.error("Error fetching contact us page from Prismic:", error);
    return null;
  }
}
