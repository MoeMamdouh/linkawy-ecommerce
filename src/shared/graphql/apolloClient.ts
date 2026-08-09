// ──────────────────────────────────────────────
// Apollo Client for Shopify Storefront API
// ──────────────────────────────────────────────

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const SHOPIFY_STORE_DOMAIN = 'linkawy-3c3pluxk.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = '1ee90a470dc1bfa3b8c69f27cda48e5c';

const httpLink = createHttpLink({
  uri: `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    'Content-Type': 'application/json',
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
