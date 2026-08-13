// ──────────────────────────────────────────────
// Wishlist Feature — GraphQL Queries
// ──────────────────────────────────────────────

import { gql } from '@apollo/client';

export const GET_WISHLIST_PRODUCTS_QUERY = gql`
  query GetWishlistProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        productType
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        options {
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;
