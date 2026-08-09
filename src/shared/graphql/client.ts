import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const domain =
  process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN ||
  process.env.SHOPIFY_STORE_DOMAIN ||
  'linkawy-3c3pluxk.myshopify.com';

const publicAccessToken =
  process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  '1ee90a470dc1bfa3b8c69f27cda48e5c';

const shopDomain = domain ? domain.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
const graphqlUri = `https://${shopDomain}/api/2024-07/graphql`;

const httpLink = new HttpLink({
  uri: graphqlUri,
  headers: {
    'X-Shopify-Storefront-Access-Token': publicAccessToken,
    'Content-Type': 'application/json',
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});


export default apolloClient;