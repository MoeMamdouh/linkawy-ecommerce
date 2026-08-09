// ──────────────────────────────────────────────
// Product Details Feature — GraphQL Queries
// ──────────────────────────────────────────────

import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAILS_QUERY = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      title
      description
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
    }
  }
`;
