import { all, fork } from 'redux-saga/effects';
import AuthSaga from './Auth/saga';

export default function* rootSaga() {
  yield all([fork(AuthSaga)]);
}
