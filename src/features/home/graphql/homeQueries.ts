import { gql } from '@apollo/client';
import {
  COLLECTION_FULL_FRAGMENT,
  PRODUCT_CARD_FRAGMENT,
} from '@shared/graphql/fragments';

export const PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query HomeProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          ...ProductCardFields
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = gql`
  ${COLLECTION_FULL_FRAGMENT}
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFullFields
        }
      }
    }
  }
`;
