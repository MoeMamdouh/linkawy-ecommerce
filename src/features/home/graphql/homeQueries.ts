// // ──────────────────────────────────────────────
// // Home Feature — Shopify Storefront GraphQL Queries
// // ──────────────────────────────────────────────

// import { gql } from '@apollo/client';

// /**
//  * Fetch products for the home screen (flash sale, featured, new arrivals).
//  * Uses Shopify Storefront API.
//  */
// export const PRODUCTS_QUERY = gql`
//   query HomeProducts($first: Int!) {
//     products(first: $first, sortKey: CREATED_AT, reverse: true) {
//       edges {
//         node {
//           id
//           title
//           handle
//           productType
//           tags
//           featuredImage {
//             url
//             altText
//           }
//           priceRange {
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//           compareAtPriceRange {
//             maxVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// /**
//  * Fetch collections for the categories section.
//  */
// export const COLLECTIONS_QUERY = gql`
//   query HomeCollections($first: Int!) {
//     collections(first: $first) {
//       edges {
//         node {
//           id
//           title
//           handle
//           image {
//             url
//             altText
//           }
//         }
//       }
//     }
//   }
// `;


// ──────────────────────────────────────────────
// Home Feature — Shopify Storefront GraphQL Queries
// ──────────────────────────────────────────────

import { gql } from '@apollo/client';

/**
 * Fetch products for the home screen (flash sale, featured, new arrivals).
 * Uses Shopify Storefront API.
 */
export const PRODUCTS_QUERY = gql`
  query HomeProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          productType
          tags
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
    }
  }
`;

/**
 * Fetch collections for categories and banner slides.
 * Includes description and image for full Shopify dynamic banners.
 */
export const COLLECTIONS_QUERY = gql`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;