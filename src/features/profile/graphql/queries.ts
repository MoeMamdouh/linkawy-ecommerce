import { gql } from "@apollo/client";

export const GET_CUSTOMER_ORDERS_QUERY = gql`
  query getCustomerOrders($customerAccessToken: String!, $first: Int = 20) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        totalCount
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    image {
                      url
                      altText
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CUSTOMER_ADDRESSES_QUERY = gql`
  query getCustomerAddresses($customerAccessToken: String!, $first: Int = 10) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      defaultAddress {
        id
      }
      addresses(first: $first) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
    }
  }
`;
