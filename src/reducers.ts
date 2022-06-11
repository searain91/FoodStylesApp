import {combineReducers} from 'redux';
import {CLEAR_NETWORK_FAIL, SEND_NETWORK_FAIL} from './actions';
import {getCardListResponse} from './cardList/src/cardListReducer';

export interface NetworkState {
  fetching: boolean;
  data: any;
  err: any;
}

export interface Action {
  type: string;
  payload: any;
}

export interface GlobalState {
  sendNetworkFail: NetworkState;
  getCardListResponse: cardList.State;
}

const initialState = {fetching: false, data: null, err: null};

const sendNetworkFail = (
  state: NetworkState = initialState,
  action: Action,
) => {
  switch (action.type) {
    case SEND_NETWORK_FAIL:
      return {
        err: action.payload.err,
      };
    case CLEAR_NETWORK_FAIL:
      return {
        err: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({sendNetworkFail, getCardListResponse});
export default rootReducer;
