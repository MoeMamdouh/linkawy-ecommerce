import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const domain = process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN || '';
const publicAccessToken = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';

if (__DEV__) {
  if (!domain) {
    console.warn('Warning: EXPO_PUBLIC_SHOPIFY_DOMAIN is not defined.');
  }
  if (!publicAccessToken) {
    console.warn('Warning: EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not defined.');
  }
}

const shopDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
const graphqlUri = `https://${shopDomain}/api/2026-07/graphql`;

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