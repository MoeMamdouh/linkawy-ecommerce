import { gql } from '@apollo/client';
import {
  COLLECTION_BASIC_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from '@shared/graphql/fragments';

export const SHOP_COLLECTIONS_QUERY = gql`
  ${COLLECTION_BASIC_FRAGMENT}
  query ShopCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionBasicFields
        }
      }
    }
  }
`;

export const SHOP_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ShopProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductCardFields
        }
      }
    }
  }
`;

export const SHOP_COLLECTION_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ShopCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...ProductCardFields
          }
        }
      }
    }
  }
`;
