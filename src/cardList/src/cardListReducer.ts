import {
  CLOSE_CARD_OPTIONS,
  CREATE_CARD_DONE,
  DELETE_CARD_DONE,
  DUPLICATE_CARD_DONE,
  GET_LIST_CARD_DONE,
  GET_LIST_CARD_ERROR,
  SHARE_CARD_REQUEST,
  SHOW_CARD_OPTIONS,
} from './cardListActions';
import {Action} from '../../reducers';

export interface CardState {
  cardList: cardList.CardItem[];
  cardOption: cardList.CardOption;
  err: any;
}

const initialState: CardState = {
  cardList: [],
  cardOption: {card: {id: '', name: ''}, offset: 0},
  err: null,
};

export const getCardListResponse = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_LIST_CARD_DONE:
      return Object.assign({}, state, {cardList: action.payload});
    case GET_LIST_CARD_ERROR:
      return Object.assign({}, state, {err: action.payload.err});
    case CREATE_CARD_DONE:
    case DUPLICATE_CARD_DONE:
    case DELETE_CARD_DONE:
      return Object.assign({}, state, {cardList: action.payload});
    case SHOW_CARD_OPTIONS:
      const {card, offset} = action.payload;
      return Object.assign({}, state, {cardOption: {card, offset}});
    case CLOSE_CARD_OPTIONS:
      return Object.assign({}, state, {
        cardOption: {card: {id: '', name: ''}, offset: 0},
      });
    case SHARE_CARD_REQUEST:
      return state;
    default:
      return state;
  }
};
