import {all} from 'redux-saga/effects';
import {
  watchCreateCard,
  watchDeleteCard,
  watchDuplicateCard,
  watchGetCardList,
} from './cardList/src/cardListSaga';
export default function* rootSaga() {
  yield all([
    watchGetCardList(),
    watchCreateCard(),
    watchDuplicateCard(),
    watchDeleteCard(),
  ]);
}
