/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  USER_CREATED_STATE,
  FETCH_USER_CREATED,
  FETCH_USER_CREATED_REJECTED,
  FETCH_USER_CREATED_SUCCESSFUL,
  SESSION_VALID_STATE,
  FETCH_SESSION_VALID,
  FETCH_SESSION_VALID_REJECTED,
  FETCH_SESSION_VALID_SUCCESSFUL,
  ACTIVE_ADDRESS_FETCH_STATE,
  FETCH_ACTIVE_ADDRESS,
  FETCH_ACTIVE_ADDRESS_REJECTED,
  FETCH_ACTIVE_ADDRESS_SUCCESSFUL,
  SAVE_ADDRESS_STATE,
  SAVE_ADDRESS,
  SAVE_ADDRESS_REJECTED,
  SAVE_ADDRESS_SUCCESSFUL,
} from './constants';

const setState = (requesting = false, error = null, data = null) => ({
  requesting,
  error,
  data,
});

export const initialState = fromJS({
  [USER_CREATED_STATE]: setState(),
  [SESSION_VALID_STATE]: setState(),
  [ACTIVE_ADDRESS_FETCH_STATE]: setState(),
  [SAVE_ADDRESS_STATE]: setState(),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_CREATED:
      return state.set(USER_CREATED_STATE, setState(true));

    case FETCH_USER_CREATED_REJECTED:
      return state.set(USER_CREATED_STATE, setState(false, true));

    case FETCH_USER_CREATED_SUCCESSFUL:
      return state.set(
        USER_CREATED_STATE,
        setState(false, null, action.payload),
      );

    case FETCH_SESSION_VALID:
      return state.set(SESSION_VALID_STATE, setState(true));

    case FETCH_SESSION_VALID_REJECTED:
      return state.set(SESSION_VALID_STATE, setState(false, null, false));

    case FETCH_SESSION_VALID_SUCCESSFUL:
      return state.set(
        SESSION_VALID_STATE,
        setState(false, null, action.payload),
      );

    case FETCH_ACTIVE_ADDRESS:
      return state.set(ACTIVE_ADDRESS_FETCH_STATE, setState(true));

    case FETCH_ACTIVE_ADDRESS_REJECTED:
      return state.set(ACTIVE_ADDRESS_FETCH_STATE, setState(false, true));

    case FETCH_ACTIVE_ADDRESS_SUCCESSFUL:
      return state.set(
        ACTIVE_ADDRESS_FETCH_STATE,
        setState(false, null, action.payload),
      );

    case SAVE_ADDRESS:
      return state.set(SAVE_ADDRESS_STATE, setState(true));

    case SAVE_ADDRESS_REJECTED:
      return state.set(SAVE_ADDRESS_STATE, setState(false, true));

    case SAVE_ADDRESS_SUCCESSFUL:
      return state.set(
        SAVE_ADDRESS_STATE,
        setState(false, null, action.payload),
      );

    default:
      return state;
  }
}

export default appReducer;
