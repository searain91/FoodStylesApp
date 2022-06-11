export const GET_LIST_CARD_DONE = 'GET_LIST_CARD_DONE';
export const GET_LIST_CARD_ERROR = 'GET_LIST_CARD_ERROR';
export const GET_LIST_CARD_REQUEST = 'GET_LIST_CARD_REQUEST';
export const CREATE_CARD_REQUEST = 'CREATE_CARD_REQUEST';
export const CREATE_CARD_DONE = 'CREATE_CARD_DONE';
export const SHOW_CARD_OPTIONS = 'SHOW_CARD_OPTIONS';
export const CLOSE_CARD_OPTIONS = 'CLOSE_CARD_OPTIONS';
export const SHARE_CARD_REQUEST = 'SHARE_CARD_REQUEST';
export const DUPLICATE_CARD_REQUEST = 'DUPLICATE_CARD_REQUEST';
export const DUPLICATE_CARD_DONE = 'DUPLICATE_CARD_DONE';
export const DELETE_CARD_REQUEST = 'DELETE_CARD_REQUEST';
export const DELETE_CARD_DONE = 'DELETE_CARD_DONE';

export const getListCardRequest = () => {
  return {type: GET_LIST_CARD_REQUEST};
};

export const showCardOptions = (card: cardList.CardItem, offset: number) => {
  return {type: SHOW_CARD_OPTIONS, payload: {card, offset}};
};

export const closeCardOptions = () => {
  return {type: CLOSE_CARD_OPTIONS};
};

export const addCardRequest = (name: string) => {
  return {type: CREATE_CARD_REQUEST, payload: name};
};

export const createCardDone = (data: cardList.CardItem[]) => {
  return {type: CREATE_CARD_DONE, payload: data};
};

export const getListCardDone = (data: cardList.CardItem[]) => {
  return {type: GET_LIST_CARD_DONE, payload: data};
};

export const getListCardError = (err: any) => {
  return {type: GET_LIST_CARD_DONE, payload: {err}};
};

export const duplicateCardRequest = (id: string) => {
  return {type: DUPLICATE_CARD_REQUEST, payload: {id}};
};

export const deleteCardRequest = (id: string) => {
  return {type: DELETE_CARD_REQUEST, payload: {id}};
};

export const duplicateCardDone = (data: cardList.CardItem[]) => {
  return {type: DUPLICATE_CARD_DONE, payload: data};
};

export const deleteCardDone = (data: cardList.CardItem[]) => {
  return {type: DELETE_CARD_DONE, payload: data};
};
