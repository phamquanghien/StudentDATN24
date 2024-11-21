import { all, fork } from "redux-saga/effects";
import AuthSaga from "./Auth/saga";
import { DepartmentSaga } from "@/store/Department/saga.ts";
import { AdvisorSaga } from "@/store/Advisor/saga.ts";
import { StudentSaga } from "@/store/Student/saga.ts";
import { CouncilSaga } from "@/store/Council/saga.ts";
import DashboardSaga from "@/store/Dashboard/saga.ts";

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(DepartmentSaga),
    fork(AdvisorSaga),
    fork(StudentSaga),
    fork(CouncilSaga),
    fork(DashboardSaga),
  ]);
}
