import ApolloClient from 'apollo-boost';
import {getToken} from './utils/localStorage';
import {
  GET_CARDS_LIST,
  CREAT_CARDS,
  SHARE_CARD,
  DUPLICATE_CARD,
  DELETE_CARD,
} from './globalGraphql';
import {graphUrl} from './const';

export const apolloClient = new ApolloClient({
  uri: graphUrl,
  request: async operation => {
    const authToken = await getToken();
    operation.setContext({
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    });
  },
});

export const getListCardApi = () => {
  return apolloClient.query({
    query: GET_CARDS_LIST,
  });
};

export const createCardApi = (name: string) => {
  return apolloClient.mutate({
    mutation: CREAT_CARDS,
    variables: {
      name,
      locationTypeIds: [],
      locationCuisineTypeIds: [],
      dishTypeIds: [],
      courseTypeIds: [],
      dietIds: [],
      excludedIngredientIds: [],
    },
  });
};

export const shareCardApi = (id: string) => {
  return apolloClient.mutate({
    mutation: SHARE_CARD,
    variables: {
      id,
    },
  });
};

export const duplicateCardApi = (id: string) => {
  return apolloClient.mutate({
    mutation: DUPLICATE_CARD,
    variables: {
      id,
    },
  });
};

export const deleteCardApi = (id: string) => {
  return apolloClient.mutate({
    mutation: DELETE_CARD,
    variables: {
      id,
    },
  });
};
