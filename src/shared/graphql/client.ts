import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const domain = process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN;
const publicAccessToken = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

if (!domain || !publicAccessToken) {
  throw new Error('Missing Shopify environment variables in .env');
}

export const storefrontClient = createStorefrontApiClient({
  storeDomain: domain,
  publicAccessToken: publicAccessToken,
  apiVersion: '2026-04', // Uses stable Shopify API version
});