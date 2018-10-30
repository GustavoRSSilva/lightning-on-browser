import { takeLatest, call, put } from 'redux-saga/effects';

import { setSession, getUser, saveUser } from 'containers/App/saga';
import { PASSWORD } from 'containers/App/constants';

import { SUBMIT_FORM } from './constants';
import { submitFormRejected, submitFormSuccessful } from './actions';

// Workers sagas
function* savePassword(password) {
  try {
    setSession(true);
    let user = yield getUser();

    if (!user) {
      user = {};
    }
    user[PASSWORD] = password;
    saveUser(user);
    return user;
  } catch (e) {
    throw e;
  }
}

// Watcher sagas

function* callSubmitForm(action) {
  try {
    yield call(savePassword, action.payload);
    yield put(submitFormSuccessful());
  } catch (e) {
    yield put(submitFormRejected('something went wrong'));
  }
}

function* submitFormSaga() {
  yield takeLatest(SUBMIT_FORM, callSubmitForm);
}

// Root sagas
export default function* defaultSaga() {
  yield [submitFormSaga()];
}
