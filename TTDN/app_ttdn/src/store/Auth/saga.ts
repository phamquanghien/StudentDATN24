import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailed } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseLoginType, AuthType } from '../../models/Auth';
import { login } from '../../api/backend_helper';

function* onLogin(
  action: PayloadAction<AuthType>
): Generator<any, void, AuthResponseLoginType> {
  try {
    const response = yield call(login, action.payload);
    localStorage.setItem('accessToken', response.token);
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailed(error));
  }
}

function* AuthSaga() {
  yield takeLatest('auth/login', onLogin);
}

export default AuthSaga;
