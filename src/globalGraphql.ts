import gql from 'graphql-tag';

export const LOG_IN_WITH_EMAIL = gql`
  mutation login($email: EmailAddress!, $password: NonEmptyString!) {
    loginWithEmail(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const GET_CARDS_LIST = gql`
  {
    cards {
      id
      name
    }
  }
`;

export const CREAT_CARDS = gql`
  mutation CreateCard(
    $name: NonEmptyString!
    $locationTypeIds: [ID!]!
    $locationCuisineTypeIds: [ID!]!
    $dishTypeIds: [ID!]!
    $courseTypeIds: [ID!]!
    $dietIds: [ID!]!
    $excludedIngredientIds: [ID!]!
  ) {
    createCard(
      data: {
        name: $name
        locationTypeIds: $locationTypeIds
        locationCuisineTypeIds: $locationCuisineTypeIds
        dishTypeIds: $dishTypeIds
        courseTypeIds: $courseTypeIds
        dietIds: $dietIds
        excludedIngredientIds: $excludedIngredientIds
      }
    ) {
      id
      name
    }
  }
`;

export const SHARE_CARD = gql`
  mutation ShareCard($id: ID!) {
    shareCard(id: $id)
  }
`;

export const DUPLICATE_CARD = gql`
  mutation DuplicateCard($id: ID!) {
    duplicateCard(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;
