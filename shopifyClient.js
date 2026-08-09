import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'https://linkawy-3c3pluxk.myshopify.com/api/2024-01/graphql.json',
    headers: {
        'X-Shopify-Storefront-Access-Token': '1ee90a470dc1bfa3b8c69f27cda48e5c',
        'Content-Type': 'application/json',
    },
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});