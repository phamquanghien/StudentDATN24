import { call, put, takeLatest } from "redux-saga/effects";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  importScore,
  subscribeAdvisor,
  subscribeCompany,
  subscribeTopic,
  updateStudent,
} from "@/api/backend_helper.ts";
import {
  createStudentFailure,
  createStudentSuccess,
  deleteStudentFailure,
  deleteStudentSuccess,
  getStudentByIdFailure,
  getStudentByIdSuccess,
  getStudentsFailure,
  getStudentsSuccess,
  importScoreFailure,
  importScoreSuccess,
  subscribeAdvisorFailure,
  subscribeAdvisorSuccess,
  subscribeCompanyFailure,
  subscribeCompanySuccess,
  subscribeTopicFailure,
  subscribeTopicSuccess,
  updateStudentFailure,
  updateStudentSuccess,
} from "@/store/Student/slice.ts";
import {
  IAxiosErrorResponse,
  SuccessMessageResponse,
} from "@/models/Response.ts";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiStudentResponse, IStudent } from "@/models/Student.ts";
import { Paginator } from "@/models/Paginator.ts";
import { ICompany } from "@/models/Company.ts";
import { Topic } from "@/models/Topic.ts";
import { Score } from "@/models/Score.ts";

function* onGetStudent(
  action: PayloadAction<Paginator>,
): Generator<any, void, ApiStudentResponse> {
  try {
    const response = yield call(getStudents, action.payload);
    yield put(getStudentsSuccess(response));
  } catch (error) {
    yield put(getStudentsFailure(error as IAxiosErrorResponse));
  }
}

function* onGetStudentById(
  action: PayloadAction<number>,
): Generator<any, void, IStudent> {
  try {
    const response = yield call(getStudentById, action.payload);
    yield put(getStudentByIdSuccess(response));
  } catch (error) {
    yield put(getStudentByIdFailure(error as IAxiosErrorResponse));
  }
}

function* onCreateStudent(
  action: PayloadAction<IStudent>,
): Generator<any, void, any> {
  try {
    const response = yield call(createStudent, action.payload);
    yield put(createStudentSuccess(response));
  } catch (error) {
    yield put(createStudentFailure(error as IAxiosErrorResponse));
  }
}

function* onUpdateStudent(
  action: PayloadAction<{ id: number; data: IStudent }>,
): Generator<any, void, any> {
  try {
    const response = yield call(
      updateStudent,
      action.payload.id,
      action.payload.data,
    );
    yield put(updateStudentSuccess(response));
  } catch (error) {
    yield put(updateStudentFailure(error as IAxiosErrorResponse));
  }
}

function* onSubscribeAdvisor(
  action: PayloadAction<{ id: number; advisorId: number }>,
): Generator<any, void, SuccessMessageResponse> {
  try {
    const { id, advisorId } = action.payload;
    const response = yield call(subscribeAdvisor, id, advisorId);
    yield put(subscribeAdvisorSuccess(response));
  } catch (error) {
    yield put(subscribeAdvisorFailure(error as IAxiosErrorResponse));
  }
}

function* onSubscribeCompany(
  action: PayloadAction<{ id: number; company: ICompany }>,
): Generator<any, void, SuccessMessageResponse> {
  try {
    const { id, company } = action.payload;
    const response = yield call(subscribeCompany, id, company);
    yield put(subscribeCompanySuccess(response));
  } catch (error) {
    yield put(subscribeCompanyFailure(error as IAxiosErrorResponse));
  }
}

function* onSubscribeTopic(
  action: PayloadAction<{ id: number; topic: Topic }>,
): Generator<any, void, SuccessMessageResponse> {
  try {
    const { id, topic } = action.payload;
    const response = yield call(subscribeTopic, id, topic);
    yield put(subscribeTopicSuccess(response));
  } catch (error) {
    yield put(subscribeTopicFailure(error as IAxiosErrorResponse));
  }
}

function* onImportScore(
  action: PayloadAction<{ id: number; score: Score }>,
): Generator<any, void, any> {
  try {
    const response = yield call(
      importScore,
      action.payload.id,
      action.payload.score,
    );
    yield put(importScoreSuccess(response));
  } catch (error) {
    yield put(importScoreFailure(error as IAxiosErrorResponse));
  }
}

function* onDeleteStudent(
  action: PayloadAction<number>,
): Generator<any, void, any> {
  try {
    const response = yield call(deleteStudent, action.payload);
    yield put(deleteStudentSuccess(response));
  } catch (error) {
    yield put(deleteStudentFailure(error as IAxiosErrorResponse));
  }
}

export function* StudentSaga() {
  yield takeLatest("student/getStudentsRequest", onGetStudent);
  yield takeLatest("student/getStudentByIdRequest", onGetStudentById);
  yield takeLatest("student/createStudentRequest", onCreateStudent);
  yield takeLatest("student/updateStudentRequest", onUpdateStudent);
  yield takeLatest("student/subscribeAdvisorRequest", onSubscribeAdvisor);
  yield takeLatest("student/subscribeCompanyRequest", onSubscribeCompany);
  yield takeLatest("student/subscribeTopicRequest", onSubscribeTopic);
  yield takeLatest("student/deleteStudentRequest", onDeleteStudent);
  yield takeLatest("student/importScoreRequest", onImportScore);
}
