import { combineReducers } from "redux";
import Auth from "./Auth/slice";
import Department from "./Department/slice";
import Advisor from "./Advisor/slice";
import Student from "./Student/slice";
import Council from "./Council/slice";
import Dashboard from "./Dashboard/slice";

const rootReducer = combineReducers({
  Auth,
  Department,
  Advisor,
  Student,
  Council,
  Dashboard,
});

export default rootReducer;
