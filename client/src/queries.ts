import { gql } from "@apollo/client";

export const CREDIT_CARD = gql`
  query {
    creditCard {
      number
    }
  }
`;

export const VALIDATE_CREDIT_CARD = gql`
  mutation ValidateCreditCard($creditCardNumber: String!) {
    validateCreditCard(creditCardNumber: $creditCardNumber)
  }
`;
