import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


const domain = process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN;
const publicAccessToken = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const shopDomain = domain ? domain.replace(/^https?:\/\//, '') : '';

const httpLink = new HttpLink({
  uri: shopDomain ? `https://${shopDomain}/api/2026-04/graphql` : '',
  headers: {
    'X-Shopify-Storefront-Access-Token': publicAccessToken || '',
    'Content-Type': 'application/json',
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;