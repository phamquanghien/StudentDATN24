import { call, put, takeLatest } from "redux-saga/effects";
import { getAdvisors } from "@/api/backend_helper.ts";
import {
  getAdvisorsFailure,
  getAdvisorsSuccess,
} from "@/store/Advisor/slice.ts";
import { IAxiosErrorResponse } from "@/models/Response.ts";
import { IAdvisor } from "@/models/Advisor.ts";

function* onGetAdvisors(): Generator<any, void, IAdvisor[]> {
  try {
    const response = yield call(getAdvisors);
    yield put(getAdvisorsSuccess(response));
  } catch (error) {
    yield put(getAdvisorsFailure(error as IAxiosErrorResponse));
  }
}

export function* AdvisorSaga() {
  yield takeLatest("advisor/getAdvisorsRequest", onGetAdvisors);
}
