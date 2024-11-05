import { call, put, takeLatest } from "redux-saga/effects";
import {
  createDepartmentFailed,
  createDepartmentSuccess,
  deleteDepartmentFailed,
  deleteDepartmentSuccess,
  getDepartmentsFailed,
  getDepartmentsSuccess,
  updateDepartmentFailed,
  updateDepartmentSuccess,
} from "@/store/Department/slice.ts";
import { DeleteApiResponse, IAxiosErrorResponse } from "@/models/Response.ts";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "@/api/backend_helper.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { IDepartment } from "@/models/Department.ts";

function* onGetDepartments(): Generator<any, void, any> {
  try {
    const response = yield call(getDepartments);
    yield put(getDepartmentsSuccess(response));
  } catch (error) {
    yield put(getDepartmentsFailed(error as IAxiosErrorResponse));
  }
}

function* onCreateDepartment(
  action: PayloadAction<IDepartment>,
): Generator<any, void, any> {
  try {
    const response = yield call(createDepartment, action.payload);
    yield put(createDepartmentSuccess(response));
  } catch (error) {
    yield put(createDepartmentFailed(error as IAxiosErrorResponse));
  }
}

function* onUpdateDepartment(
  action: PayloadAction<{ id: number; data: IDepartment }>,
): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const response = yield call(updateDepartment, id, data);
    yield put(updateDepartmentSuccess(response));
  } catch (error) {
    yield put(updateDepartmentFailed(error as IAxiosErrorResponse));
  }
}

function* onDeleteDepartment(
  action: PayloadAction<number>,
): Generator<any, void, DeleteApiResponse> {
  try {
    const response = yield call(deleteDepartment, action.payload);
    yield put(deleteDepartmentSuccess(response));
  } catch (error) {
    yield put(deleteDepartmentFailed(error as IAxiosErrorResponse));
  }
}

export function* DepartmentSaga() {
  yield takeLatest("department/getDepartments", onGetDepartments);
  yield takeLatest("department/createDepartmentRequest", onCreateDepartment);
  yield takeLatest("department/deleteDepartmentRequest", onDeleteDepartment);
  yield takeLatest("department/updateDepartmentRequest", onUpdateDepartment);
}
