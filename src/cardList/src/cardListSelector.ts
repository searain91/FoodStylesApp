import {createSelector} from 'reselect';
import {GlobalState} from '../../reducers';

export const cardListSelector = (state: GlobalState) =>
  state.getCardListResponse;

export const listCardDataSelector = createSelector(
  cardListSelector,
  card => card.cardList,
);
