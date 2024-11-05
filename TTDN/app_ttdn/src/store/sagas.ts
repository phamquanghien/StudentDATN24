import { all, fork } from "redux-saga/effects";
import AuthSaga from "./Auth/saga";
import { DepartmentSaga } from "@/store/Department/saga.ts";
import { AdvisorSaga } from "@/store/Advisor/saga.ts";

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(DepartmentSaga), fork(AdvisorSaga)]);
}
