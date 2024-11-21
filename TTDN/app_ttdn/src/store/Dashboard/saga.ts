import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getColumnChartFailure,
  getColumnChartSuccess,
  getCountsFailure,
  getCountsSuccess,
  getRatiosFailure,
  getRatiosSuccess,
} from "@/store/Dashboard/slice.ts";
import { IAxiosErrorResponse } from "@/models/Response.ts";
import { getColumns, getDashboard, getRatio } from "@/api/backend_helper.ts";

function* onGetCounts(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const response = yield call(getDashboard, action.payload);
    yield put(getCountsSuccess(response));
  } catch (error) {
    yield put(getCountsFailure(error as IAxiosErrorResponse));
  }
}

function* onGetRatios(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const response = yield call(getRatio, action.payload);
    yield put(getRatiosSuccess(response.data));
  } catch (error) {
    yield put(getRatiosFailure(error as IAxiosErrorResponse));
  }
}

function* onGetColumns(action: PayloadAction<any>): Generator<any, void, any> {
  try {
    const response = yield call(getColumns, action.payload);
    yield put(getColumnChartSuccess(response.data));
  } catch (error) {
    yield put(getColumnChartFailure(error as IAxiosErrorResponse));
  }
}

export default function* DashboardSaga() {
  yield takeLatest("dashboard/getCountsRequest", onGetCounts);
  yield takeLatest("dashboard/getRatiosRequest", onGetRatios);
  yield takeLatest("dashboard/getColumnChartRequest", onGetColumns);
}
