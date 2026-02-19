import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = "valor-website";

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "terms_page",
    path: "/terms-and-conditions",
  },
  {
    type: "cancellation_policy_page",
    path: "/cancellation-refund-policy",
  },
  {
    type: "site_settings",
    path: "/",
  },
  {
    type: "blog_post",
    path: "/blog/:uid",
  },
  {
    type: "blog_listing_page",
    path: "/blog",
  },
  {
    type: "contact_us_page",
    path: "/contact-us",
  },
  // Add this route once the document type is created in Prismic:
  // {
  //   type: "privacy_policy_page",
  //   path: "/privacy-policy",
  // },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * fetch content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions: {
      next: { tags: ["prismic"], revalidate: 5 },
    },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};
