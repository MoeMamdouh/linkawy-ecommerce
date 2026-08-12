import { gql } from '@apollo/client';
import { CART_FRAGMENT } from '@shared/graphql/fragments';

export const GET_CART_QUERY = gql`
  ${CART_FRAGMENT}
  query GetCart($id: ID!) {
    cart(id: $id) {
      ...CartFields
    }
  }
`;
