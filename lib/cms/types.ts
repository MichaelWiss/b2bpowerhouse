// ---------------------------------------------------------------------------
// CMS content types (matching Sanity schemas)
// ---------------------------------------------------------------------------

export interface ProductContent {
  richDescription: unknown; // Portable Text blocks
  specSheets: { asset: { url: string; originalFilename: string } }[] | null;
  complianceDocs: { asset: { url: string; originalFilename: string } }[] | null;
  gallery: { asset: { url: string }; altText: string | null }[] | null;
  technicalSpecs: Record<string, string> | null;
}

export interface Category {
  title: string;
  slug: string;
  description: string | null;
}
