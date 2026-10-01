import { 
  ShopifyProduct, 
  ShopifyCart, 
  ShopifyCartLineInput, 
  ShopifyCartLineUpdateInput 
} from '../types/shopify';

const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'h1hk4t-v3.myshopify.com';
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'cfdfd8e0af055f2bd2e49e34a0868a40';
const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-07';

// Fallback to mock mode only if somehow credentials cannot be resolved
export const isMockMode = !domain || !storefrontAccessToken;

// Helper to simulate network delay for realistic mock loading states
const mockDelay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

export async function shopifyFetch<T>({
  cache,
  headers,
  query,
  tags,
  variables,
  revalidate = 60
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: any;
  revalidate?: number | false;
}): Promise<{ status: number; body: T } | never> {
  if (isMockMode) {
    throw new Error('Shopify credentials missing. Running in mock mode.');
  }

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
      ...(cache ? { cache } : { next: { revalidate, tags } })
    });


    const body = await result.json();

    if (body.errors) {
      console.error('Shopify GraphQL Errors:', body.errors);
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    console.error('Error in shopifyFetch:', error);
    throw error;
  }
}

// ============================================================================
// GRAPHQL FRAGMENTS & QUERIES
// ============================================================================

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              product {
                id
                title
                handle
              }
              image {
                url
                altText
              }
            }
          }
          sellingPlanAllocation {
            sellingPlan {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      seo {
        title
        description
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            sku
            image {
              url
              altText
            }
            sellingPlanAllocations(first: 10) {
              edges {
                node {
                  sellingPlan {
                    id
                    name
                    description
                    options {
                      name
                      value
                    }
                    priceAdjustments {
                      adjustmentValue {
                        ... on SellingPlanPercentagePriceAdjustment {
                          adjustmentPercentage
                        }
                        ... on SellingPlanFixedAmountPriceAdjustment {
                          adjustmentAmount {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

const ADD_TO_CART_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const UPDATE_CART_LINES_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const REMOVE_FROM_CART_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

// ============================================================================
// MOCK DATA FOR LOCAL / PRE-CONFIG TESTING
// ============================================================================
const MOCK_PRODUCT: ShopifyProduct = {
  id: 'gid://shopify/Product/mock-1',
  handle: 'longevity',
  title: 'LEVL LIFESPAN+ DeepCell',
  description: 'A science-forward daily formula designed to support foundational pathways associated with cellular longevity, NAD+ restoration, and metabolic vitality.',
  descriptionHtml: '<p>A science-forward daily formula designed to support foundational pathways associated with cellular longevity, NAD+ restoration, and metabolic vitality.</p>',
  seo: {
    title: 'LEVL LIFESPAN+ DeepCell | Daily Cellular Longevity Protocol',
    description: 'A science-forward daily formula designed to support foundational pathways associated with healthy aging.'
  },
  priceRange: {
    minVariantPrice: { amount: '49.00', currencyCode: 'USD' },
    maxVariantPrice: { amount: '147.00', currencyCode: 'USD' },
  },
  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/mock-variant-30',
          title: '30-Day Supply (1 Bottle)',
          availableForSale: true,
          price: { amount: '59.00', currencyCode: 'USD' },
          sku: 'LVL-DC-30',
          image: { url: '/images/deepcell-bottle.jpg', altText: 'LEVL DeepCell 30-Day' },
          sellingPlanAllocations: {
            edges: [
              {
                node: {
                  sellingPlan: {
                    id: 'gid://shopify/SellingPlan/mock-plan-30',
                    name: 'Subscribe & Save ($49/month)',
                    options: [{ name: 'Delivery every', value: '30 Days' }],
                    priceAdjustments: [
                      {
                        adjustmentValue: {
                          adjustmentPercentage: 17
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
          id: 'gid://shopify/ProductVariant/mock-variant-90',
          title: '90-Day Supply (3 Bottles)',
          availableForSale: true,
          price: { amount: '147.00', currencyCode: 'USD' },
          sku: 'LVL-DC-90',
          image: { url: '/images/deepcell-bottle.jpg', altText: 'LEVL DeepCell 90-Day' },
          sellingPlanAllocations: {
            edges: [
              {
                node: {
                  sellingPlan: {
                    id: 'gid://shopify/SellingPlan/mock-plan-90',
                    name: 'Quarterly Protocol ($132 every 3 months - $44/bottle)',
                    options: [{ name: 'Delivery every', value: '90 Days' }],
                    priceAdjustments: [
                      {
                        adjustmentValue: {
                          adjustmentPercentage: 25
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
  id: 'gid://shopify/Cart/mock-cart-session',
  checkoutUrl: 'https://checkout.shopify.com',
  cost: {
    subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
    totalAmount: { amount: '0.00', currencyCode: 'USD' },
  },
  lines: { edges: [] },
  totalQuantity: 0,
};

// ============================================================================
// STOREFRONT API METHODS
// ============================================================================

const GET_FIRST_PRODUCT_QUERY = `
  query getFirstProduct {
    products(first: 1) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          seo {
            title
            description
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                sku
                image {
                  url
                  altText
                }
                sellingPlanAllocations(first: 10) {
                  edges {
                    node {
                      sellingPlan {
                        id
                        name
                        description
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProduct(handle: string = 'lifespan-deepcell'): Promise<ShopifyProduct | undefined> {
  if (isMockMode) {
    await mockDelay(100);
    return MOCK_PRODUCT;
  }

  try {
    const res = await shopifyFetch<{ data: { product: ShopifyProduct } }>({
      query: GET_PRODUCT_QUERY,
      variables: { handle },
      tags: ['products']
    });
    if (res.body.data?.product) {
      return res.body.data.product;
    }

    const fallbackRes = await shopifyFetch<{ data: { products: { edges: { node: ShopifyProduct }[] } } }>({
      query: GET_FIRST_PRODUCT_QUERY,
      tags: ['products']
    });
    return fallbackRes.body.data?.products?.edges?.[0]?.node || MOCK_PRODUCT;
  } catch (e) {
    console.warn(`Failed to fetch product "${handle}" from Shopify, falling back to cached profile.`, e);
    return MOCK_PRODUCT;
  }
}


export async function createCart(lines?: ShopifyCartLineInput[]): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(200);
    if (lines && lines.length > 0) {
      return addToCart(MOCK_CART.id, lines);
    }
    return MOCK_CART;
  }

  try {
    const res = await shopifyFetch<{ data: { cartCreate: { cart: ShopifyCart; userErrors: any[] } } }>({
      query: CREATE_CART_MUTATION,
      variables: {
        input: lines && lines.length > 0 ? { lines } : {}
      }
    });

    if (res.body.data?.cartCreate?.userErrors?.length) {
      console.error('Cart Create User Errors:', res.body.data.cartCreate.userErrors);
    }

    return res.body.data.cartCreate.cart;
  } catch (e) {
    console.error('Error creating Shopify cart:', e);
    return MOCK_CART;
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | undefined> {
  if (isMockMode || !cartId) {
    await mockDelay(150);
    return MOCK_CART;
  }

  try {
    const res = await shopifyFetch<{ data: { cart: ShopifyCart } }>({
      query: GET_CART_QUERY,
      variables: { cartId }
    });
    return res.body.data?.cart;
  } catch (e) {
    console.error(`Error fetching cart "${cartId}":`, e);
    return MOCK_CART;
  }
}

export async function addToCart(
  cartId: string,
  lines: ShopifyCartLineInput[]
): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(300);
    
    const newEdges = lines.map(line => {
      let price = 59.00;
      let planName = 'One-Time Purchase';
      let title = '30-Day Supply (1 Bottle)';
      
      const is90 = line.sellingPlanId?.includes('90') || 
                   line.merchandiseId.includes('90') || 
                   line.merchandiseId === 'gid://shopify/ProductVariant/46955690295494';

      if (is90) {
        title = '90-Day Supply (3 Bottles)';
        if (line.sellingPlanId) {
          price = 132.00;
          planName = 'Quarterly Protocol ($132 every 3 months - $44/bottle)';
        } else {
          price = 147.00;
          planName = 'One-Time Purchase';
        }
      } else {
        title = '30-Day Supply (1 Bottle)';
        if (line.sellingPlanId) {
          price = 49.00;
          planName = 'Monthly Protocol ($49/month)';
        } else {
          price = 59.00;
          planName = 'One-Time Purchase';
        }
      }

      return {
        node: {
          id: `gid://shopify/CartLine/mock-${Math.random().toString(36).substring(2, 9)}`,
          quantity: line.quantity,
          cost: { totalAmount: { amount: (price * line.quantity).toFixed(2), currencyCode: 'USD' } },
          merchandise: {
            id: line.merchandiseId,
            title,
            product: { id: 'gid://shopify/Product/mock-1', title: 'LEVL LIFESPAN+ DeepCell', handle: 'longevity' },
            image: { url: '/images/deepcell-bottle.jpg', altText: 'LEVL DeepCell' }
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

  try {
    const res = await shopifyFetch<{ data: { cartLinesAdd: { cart: ShopifyCart; userErrors: any[] } } }>({
      query: ADD_TO_CART_MUTATION,
      variables: { cartId, lines }
    });

    if (res.body.data?.cartLinesAdd?.userErrors?.length) {
      console.error('Add To Cart Errors:', res.body.data.cartLinesAdd.userErrors);
    }

    return res.body.data.cartLinesAdd.cart;
  } catch (e) {
    console.error('Error adding lines to Shopify cart:', e);
    return MOCK_CART;
  }
}

export async function updateCartLines(
  cartId: string,
  lines: ShopifyCartLineUpdateInput[]
): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(200);
    const updatedEdges = MOCK_CART.lines.edges.map(edge => {
      const match = lines.find(l => l.id === edge.node.id);
      if (match) {
        const unitPrice = parseFloat(edge.node.cost.totalAmount.amount) / edge.node.quantity;
        return {
          node: {
            ...edge.node,
            quantity: match.quantity,
            cost: {
              totalAmount: {
                amount: (unitPrice * match.quantity).toFixed(2),
                currencyCode: 'USD'
              }
            }
          }
        };
      }
      return edge;
    }).filter(edge => edge.node.quantity > 0);

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

  try {
    const res = await shopifyFetch<{ data: { cartLinesUpdate: { cart: ShopifyCart; userErrors: any[] } } }>({
      query: UPDATE_CART_LINES_MUTATION,
      variables: { cartId, lines }
    });

    return res.body.data.cartLinesUpdate.cart;
  } catch (e) {
    console.error('Error updating Shopify cart lines:', e);
    return MOCK_CART;
  }
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  if (isMockMode) {
    await mockDelay(200);
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

  try {
    const res = await shopifyFetch<{ data: { cartLinesRemove: { cart: ShopifyCart; userErrors: any[] } } }>({
      query: REMOVE_FROM_CART_MUTATION,
      variables: { cartId, lineIds }
    });

    return res.body.data.cartLinesRemove.cart;
  } catch (e) {
    console.error('Error removing lines from Shopify cart:', e);
    return MOCK_CART;
  }
}

/**
 * Creates an instant 1-click checkout session that bypasses the cart drawer,
 * directly routing high-intent buyers into Shop Pay / Apple Pay.
 */
export async function getDirectCheckoutUrl(
  merchandiseId: string,
  quantity: number = 1,
  sellingPlanId?: string
): Promise<string> {
  if (isMockMode) {
    return 'https://checkout.shopify.com';
  }

  try {
    const cart = await createCart([{ merchandiseId, quantity, sellingPlanId }]);
    return cart.checkoutUrl;
  } catch (e) {
    console.error('Error generating direct checkout URL:', e);
    return `https://${domain}/cart/${merchandiseId}:${quantity}`;
  }
}
