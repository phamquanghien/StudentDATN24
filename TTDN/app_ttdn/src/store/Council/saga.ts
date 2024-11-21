import { PayloadAction } from "@reduxjs/toolkit";
import {
  createCouncil,
  deleteCouncil,
  getCouncils,
  updateCouncil,
} from "@/api/backend_helper.ts";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createNewCouncilFailure,
  createNewCouncilSuccess,
  deleteCouncilFailure,
  deleteCouncilSuccess,
  getCouncilsFailure,
  getCouncilsSuccess,
  updateCouncilFailure,
  updateCouncilSuccess,
} from "@/store/Council/slice.ts";
import { IAxiosErrorResponse, IDeleteResponse } from "@/models/Response.ts";
import { ICouncil, PayloadCouncil } from "@/models/Council.ts";

function* onGetCouncil(): Generator<any, void, ICouncil[]> {
  try {
    const response = yield call(getCouncils);
    yield put(getCouncilsSuccess(response));
  } catch (error) {
    yield put(getCouncilsFailure(error as IAxiosErrorResponse));
  }
}

function* onCreateCouncil(
  action: PayloadAction<PayloadCouncil>,
): Generator<any, void, ICouncil> {
  try {
    const response = yield call(createCouncil, action.payload);
    yield put(createNewCouncilSuccess(response));
  } catch (error) {
    yield put(createNewCouncilFailure(error as IAxiosErrorResponse));
  }
}

function* onUpdateCouncil(
  action: PayloadAction<{ id: number; data: ICouncil }>,
): Generator<any, void, ICouncil> {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateCouncil, id, data);
    yield put(updateCouncilSuccess(response));
  } catch (error) {
    yield put(updateCouncilFailure(error as IAxiosErrorResponse));
  }
}

function* onDeleteCouncil(
  action: PayloadAction<number>,
): Generator<any, void, IDeleteResponse> {
  try {
    const response = yield call(deleteCouncil, action.payload);
    yield put(deleteCouncilSuccess(response));
  } catch (error) {
    yield put(deleteCouncilFailure(error as IAxiosErrorResponse));
  }
}

export function* CouncilSaga() {
  yield takeLatest("council/getCouncilsRequest", onGetCouncil);
  yield takeLatest("council/createNewCouncilRequest", onCreateCouncil);
  yield takeLatest("council/updateCouncilRequest", onUpdateCouncil);
  yield takeLatest("council/deleteCouncilRequest", onDeleteCouncil);
}
