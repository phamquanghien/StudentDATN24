import { call, put, takeLatest } from "redux-saga/effects";
import {
  createAdvisor,
  deleteAdvisor,
  getAdvisors,
  updateAdvisor,
} from "@/api/backend_helper.ts";
import {
  createAdvisorFailure,
  createAdvisorSuccess,
  deleteAdvisorFailure,
  deleteAdvisorSuccess,
  getAdvisorsFailure,
  getAdvisorsSuccess,
  updateAdvisorFailure,
  updateAdvisorSuccess,
} from "@/store/Advisor/slice.ts";
import { DeleteApiResponse, IAxiosErrorResponse } from "@/models/Response.ts";
import { IAdvisor } from "@/models/Advisor.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { Paginator } from "@/models/Paginator.ts";

function* onGetAdvisors(
  action: PayloadAction<Paginator>,
): Generator<any, void, IAdvisor[]> {
  try {
    const response = yield call(getAdvisors, action.payload);
    yield put(getAdvisorsSuccess(response));
  } catch (error) {
    yield put(getAdvisorsFailure(error as IAxiosErrorResponse));
  }
}

function* onCreateAdvisor(
  action: PayloadAction<IAdvisor>,
): Generator<any, void, any> {
  try {
    const response = yield call(createAdvisor, action.payload);
    yield put(createAdvisorSuccess(response));
  } catch (error) {
    yield put(createAdvisorFailure(error as IAxiosErrorResponse));
  }
}

function* onUpdateAdvisor(
  action: PayloadAction<{ id: number; data: IAdvisor }>,
): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateAdvisor, id, data);
    yield put(updateAdvisorSuccess(response));
  } catch (error) {
    yield put(updateAdvisorFailure(error as IAxiosErrorResponse));
  }
}

function* onDeleteAdvisor(
  action: PayloadAction<number>,
): Generator<any, void, DeleteApiResponse> {
  try {
    const response = yield call(deleteAdvisor, action.payload);
    yield put(deleteAdvisorSuccess(response));
  } catch (error) {
    yield put(deleteAdvisorFailure(error as IAxiosErrorResponse));
  }
}

export function* AdvisorSaga() {
  yield takeLatest("advisor/getAdvisorsRequest", onGetAdvisors);
  yield takeLatest("advisor/createAdvisorRequest", onCreateAdvisor);
  yield takeLatest("advisor/deleteAdvisorRequest", onDeleteAdvisor);
  yield takeLatest("advisor/updateAdvisorRequest", onUpdateAdvisor);
}
