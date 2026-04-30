export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    maxVariantPrice: { amount: string; currencyCode: string };
    minVariantPrice: { amount: string; currencyCode: string };
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  seo: {
    title: string;
    description: string;
  };
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  sku: string;
  image?: { url: string; altText: string };
  sellingPlanAllocations?: {
    edges: Array<{
      node: {
        sellingPlan: ShopifySellingPlan;
      };
    }>;
  };
};

export type ShopifySellingPlan = {
  id: string;
  name: string;
  description?: string;
  options: Array<{ name: string; value: string }>;
  priceAdjustments: Array<{
    adjustmentValue: {
      adjustmentPercentage?: number;
      adjustmentAmount?: { amount: string; currencyCode: string };
    };
  }>;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount?: { amount: string; currencyCode: string };
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
  totalQuantity: number;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    image?: { url: string; altText: string };
  };
  sellingPlanAllocation?: {
    sellingPlan: {
      id: string;
      name: string;
    };
  };
};
