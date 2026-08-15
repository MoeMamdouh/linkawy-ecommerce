import { gql } from "@apollo/client";

export const CUSTOMER_LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const RENEW_TOKEN_MUTATION = gql`
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_DELETE_TOKEN_MUTATION = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_REGISTER_MUTATION = gql`
   mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const CUSTOMER_RECOVER_MUTATION = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const CUSTOMER_RESET_BY_URL_MUTATION = gql`
  mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customer {
        id
        email
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;