import { sanityClient } from "./sanity";

// Fetch CMS content linked to a Shopify product by handle
export async function getProductContent(handle: string) {
  return sanityClient.fetch(
    `*[_type == "product" && shopifyHandle == $handle][0]{
      richDescription,
      specSheets[]{ asset-> { url, originalFilename } },
      complianceDocs[]{ asset-> { url, originalFilename } },
      gallery[]{ asset-> { url }, altText },
      technicalSpecs
    }`,
    { handle },
  );
}

// Fetch all categories
export async function getCategories() {
  return sanityClient.fetch(
    `*[_type == "category"] | order(title asc) {
      title,
      "slug": slug.current,
      description
    }`,
  );
}
