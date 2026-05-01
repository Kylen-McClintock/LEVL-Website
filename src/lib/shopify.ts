import { ShopifyProduct, ShopifyCart, ShopifyCartLine } from '../types/shopify';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';

// If credentials are not present, we will run in MOCK MODE
export const isMockMode = !domain || !storefrontAccessToken;

// Helper to simulate network delay for realistic mock loading states
const mockDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: any;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    console.error('Error in shopifyFetch:', error);
    throw {
      error,
      query
    };
  }
}

// ============================================================================
// MOCK DATA
// ============================================================================
const MOCK_PRODUCT: ShopifyProduct = {
  id: 'mock-product-1',
  handle: 'longevity',
  title: 'LEVL LIFESPAN+',
  description: 'A science-forward daily formula designed to support foundational pathways associated with healthy aging.',
  descriptionHtml: '<p>A science-forward daily formula designed to support foundational pathways associated with healthy aging.</p>',
  seo: {
    title: 'LEVL LIFESPAN+ | Daily Longevity Support',
    description: 'A science-forward daily formula designed to support foundational pathways associated with healthy aging.'
  },
  priceRange: {
    maxVariantPrice: { amount: '120.00', currencyCode: 'USD' },
    minVariantPrice: { amount: '120.00', currencyCode: 'USD' },
  },
  variants: {
    edges: [
      {
        node: {
          id: 'mock-variant-30',
          title: '30-Day Supply',
          availableForSale: true,
          price: { amount: '120.00', currencyCode: 'USD' },
          sku: 'LSP-30',
          sellingPlanAllocations: {
            edges: [
              {
                node: {
                  sellingPlan: {
                    id: 'mock-plan-30',
                    name: 'Subscribe & Save (30-Day)',
                    options: [{ name: 'Delivery every', value: '30 Days' }],
                    priceAdjustments: [
                      {
                        adjustmentValue: {
                          adjustmentPercentage: 15
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      },
      {
        node: {
          id: 'mock-variant-90',
          title: '90-Day Supply',
          availableForSale: true,
          price: { amount: '340.00', currencyCode: 'USD' },
          sku: 'LSP-90',
          sellingPlanAllocations: {
            edges: [
              {
                node: {
                  sellingPlan: {
                    id: 'mock-plan-90',
                    name: 'Subscribe & Save (90-Day)',
                    options: [{ name: 'Delivery every', value: '90 Days' }],
                    priceAdjustments: [
                      {
                        adjustmentValue: {
                          adjustmentPercentage: 20
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    ]
  },
  images: {
    edges: [
      { node: { url: '/images/deepcell-bottle.jpg', altText: 'LEVL DeepCell Bottle' } },
      { node: { url: '/images/deepcell-bottle.jpg', altText: 'LEVL DeepCell Angle' } },
      { node: { url: '/images/deepcell-bottle.jpg', altText: 'LEVL DeepCell Box' } },
    ]
  }
};

let MOCK_CART: ShopifyCart = {
  id: 'mock-cart-id',
  checkoutUrl: '/checkout-mock',
  cost: {
    subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
    totalAmount: { amount: '0.00', currencyCode: 'USD' },
  },
  lines: { edges: [] },
  totalQuantity: 0,
};

// ============================================================================
// API METHODS
// ============================================================================

export async function getProduct(handle: string): Promise<ShopifyProduct | undefined> {
  if (isMockMode) {
    await mockDelay();
    return handle === 'longevity' ? MOCK_PRODUCT : undefined;
  }

  // TODO: Add real Storefront API Query here
  // const res = await shopifyFetch({ query: getProductQuery, variables: { handle } });
  // return res.body.data.product;
  return undefined;
}

export async function createCart(): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(300);
    return MOCK_CART;
  }
  
  // TODO: Add real Storefront API Query here
  return MOCK_CART;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number; sellingPlanId?: string }[]
): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(600);
    
    // Naive mock implementation
    const newEdges = lines.map(line => {
      let price = 49.00;
      let planName = 'One-Time Purchase';
      if (line.sellingPlanId === 'mock-plan-90') {
         price = 117.00;
         planName = 'Subscribe & Save (90-Day)';
      } else if (line.sellingPlanId === 'mock-plan-30') {
         price = 43.00;
         planName = 'Subscribe & Save (30-Day)';
      }

      return {
        node: {
          id: `mock-line-${Math.random()}`,
          quantity: line.quantity,
          cost: { totalAmount: { amount: (price * line.quantity).toFixed(2), currencyCode: 'USD' } },
          merchandise: {
            id: line.merchandiseId,
            title: 'LEVL DeepCell',
            product: { title: 'LEVL LIFESPAN+', handle: 'longevity' },
            image: { url: MOCK_PRODUCT.images.edges[0].node.url, altText: 'Thumb' }
          },
          sellingPlanAllocation: line.sellingPlanId ? {
            sellingPlan: { id: line.sellingPlanId, name: planName }
          } : undefined
        }
      };
    });
    
    const updatedEdges = [...MOCK_CART.lines.edges, ...newEdges];
    const totalQuantity = updatedEdges.reduce((a, b) => a + b.node.quantity, 0);
    const subtotal = updatedEdges.reduce((a, b) => a + parseFloat(b.node.cost.totalAmount.amount), 0);

    MOCK_CART = {
      ...MOCK_CART,
      lines: { edges: updatedEdges },
      totalQuantity,
      cost: {
        subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
        totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
      }
    };
    return MOCK_CART;
  }

  // TODO: Add real Storefront API Mutation here
  return MOCK_CART;
}

export async function getCart(cartId: string): Promise<ShopifyCart | undefined> {
  if (isMockMode) {
    await mockDelay(200);
    return MOCK_CART;
  }

  // TODO: Add real Storefront API Query here
  return MOCK_CART;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(400);
    const remainingEdges = MOCK_CART.lines.edges.filter(e => !lineIds.includes(e.node.id));
    const totalQuantity = remainingEdges.reduce((a, b) => a + b.node.quantity, 0);
    const subtotal = remainingEdges.reduce((a, b) => a + parseFloat(b.node.cost.totalAmount.amount), 0);
    
    MOCK_CART = {
      ...MOCK_CART,
      lines: { edges: remainingEdges },
      totalQuantity,
      cost: {
        subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
        totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'USD' },
      }
    };
    return MOCK_CART;
  }

  // TODO: Add real Storefront API Mutation here
  return MOCK_CART;
}
