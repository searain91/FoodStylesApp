import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  getListCardDone,
  getListCardError,
  createCardDone,
  GET_LIST_CARD_REQUEST,
  CREATE_CARD_REQUEST,
  DUPLICATE_CARD_REQUEST,
  duplicateCardDone,
  DELETE_CARD_REQUEST,
  deleteCardDone,
} from './cardListActions';
import {
  createCardApi,
  deleteCardApi,
  duplicateCardApi,
  getListCardApi,
} from '../../api';
import * as cardListSelectors from './cardListSelector';

export function* watchGetCardList() {
  yield takeLatest(GET_LIST_CARD_REQUEST, handleGetCardList);
}

function* handleGetCardList() {
  try {
    const result: {data: cardList.Cards} = yield call(getListCardApi);
    yield put(getListCardDone(result.data.cards));
  } catch (e) {
    yield put(getListCardError(e));
  }
}

export function* watchCreateCard() {
  yield takeLatest(CREATE_CARD_REQUEST, handleCreateCard);
}

function* handleCreateCard(action: any) {
  try {
    const result: {data: cardList.CreateCard} = yield call(
      createCardApi,
      action.payload,
    );
    const listCardData: cardList.CardItem[] = yield select(
      cardListSelectors.listCardDataSelector,
    );
    yield put(createCardDone([...listCardData, result.data.createCard]));
  } catch (e) {
    yield put(getListCardError(e));
  }
}

export function* watchDuplicateCard() {
  yield takeLatest(DUPLICATE_CARD_REQUEST, handleDuplicateCard);
}

function* handleDuplicateCard(action: any) {
  try {
    const {id} = action.payload;
    const result: {data: cardList.DuplicateCard} = yield call(
      duplicateCardApi,
      id,
    );
    const listCardData: cardList.CardItem[] = yield select(
      cardListSelectors.listCardDataSelector,
    );
    yield put(duplicateCardDone([...listCardData, result.data.duplicateCard]));
  } catch (e) {
    yield put(getListCardError(e));
  }
}

export function* watchDeleteCard() {
  yield takeLatest(DELETE_CARD_REQUEST, handleDeleteCard);
}

function* handleDeleteCard(action: any) {
  try {
    const {id} = action.payload;
    yield call(deleteCardApi, id);
    const listCardData: cardList.CardItem[] = yield select(
      cardListSelectors.listCardDataSelector,
    );
    const cardItemIndex = listCardData.findIndex(item => item.id === id);
    listCardData.splice(cardItemIndex, 1);
    yield put(deleteCardDone(listCardData));
  } catch (e) {
    yield put(getListCardError(e));
  }
}
