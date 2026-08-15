import { gql } from '@apollo/client';

export const MONEY_FRAGMENT = gql`
  fragment MoneyFields on MoneyV2 {
    amount
    currencyCode
  }
`;

export const IMAGE_FRAGMENT = gql`
  fragment ImageFields on Image {
    url
    altText
  }
`;

export const PRODUCT_VARIANT_CARD_FRAGMENT = gql`
  fragment ProductVariantCardFields on ProductVariant {
    id
    selectedOptions {
      name
      value
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = gql`
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_CARD_FRAGMENT}
  fragment ProductCardFields on Product {
    id
    title
    handle
    productType
    tags
    featuredImage {
      ...ImageFields
    }
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        ...MoneyFields
      }
    }
    options {
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          ...ProductVariantCardFields
        }
      }
    }
  }
`;

export const PRODUCT_VARIANT_DETAILS_FRAGMENT = gql`
  ${MONEY_FRAGMENT}
  fragment ProductVariantDetailsFields on ProductVariant {
    id
    title
    price {
      ...MoneyFields
    }
    compareAtPrice {
      ...MoneyFields
    }
    selectedOptions {
      name
      value
    }
  }
`;

export const PRODUCT_DETAILS_FRAGMENT = gql`
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_DETAILS_FRAGMENT}
  fragment ProductDetailsFields on Product {
    id
    title
    description
    productType
    featuredImage {
      ...ImageFields
    }
    priceRange {
      minVariantPrice {
        ...MoneyFields
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        ...MoneyFields
      }
    }
    options {
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          ...ProductVariantDetailsFields
        }
      }
    }
  }
`;

export const COLLECTION_BASIC_FRAGMENT = gql`
  fragment CollectionBasicFields on Collection {
    id
    title
    handle
  }
`;

export const COLLECTION_FULL_FRAGMENT = gql`
  ${IMAGE_FRAGMENT}
  ${COLLECTION_BASIC_FRAGMENT}
  fragment CollectionFullFields on Collection {
    ...CollectionBasicFields
    description
    image {
      ...ImageFields
    }
  }
`;

export const CART_LINE_FRAGMENT = gql`
  ${IMAGE_FRAGMENT}
  fragment CartLineFields on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        title
        price {
          ...MoneyFields
        }
        product {
          id
          title
          featuredImage {
            ...ImageFields
          }
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const CART_FRAGMENT = gql`
  ${MONEY_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  fragment CartFields on Cart {
    id
    checkoutUrl
    discountCodes {
      code
      applicable
    }
    cost {
      totalAmount {
        ...MoneyFields
      }
      subtotalAmount {
        ...MoneyFields
      }
    }
    lines(first: 100) {
      edges {
        node {
          ...CartLineFields
        }
      }
    }
  }
`;

export const CUSTOMER_FRAGMENT = gql`
  fragment CustomerFields on Customer {
    id
    firstName
    lastName
    email
    phone
  }
`;
