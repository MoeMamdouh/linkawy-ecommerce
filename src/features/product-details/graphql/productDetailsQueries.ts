import { gql } from '@apollo/client';
import { PRODUCT_DETAILS_FRAGMENT } from '@shared/graphql/fragments';

export const GET_PRODUCT_DETAILS_QUERY = gql`
  ${PRODUCT_DETAILS_FRAGMENT}
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      ...ProductDetailsFields
    }
  }
`;
