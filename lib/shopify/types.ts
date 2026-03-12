// ---------------------------------------------------------------------------
// Shopify Storefront API — TypeScript types
// ---------------------------------------------------------------------------

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ProductVariant }[] };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: { title: string; handle: string };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
    totalTaxAmount?: Money;
  };
  lines: { edges: { node: CartLine }[] };
}
