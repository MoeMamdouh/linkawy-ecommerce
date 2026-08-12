import { gql } from "@apollo/client";
import { CUSTOMER_FRAGMENT } from "@shared/graphql/fragments";

export const GET_CUSTOMER_QUERY = gql`
  ${CUSTOMER_FRAGMENT}
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...CustomerFields
    }
  }
`;
