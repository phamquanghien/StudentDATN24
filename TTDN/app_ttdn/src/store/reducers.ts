import { combineReducers } from "redux";
import Auth from "./Auth/slice";
import Department from "./Department/slice";
import Advisor from "./Advisor/slice";

const rootReducer = combineReducers({
  Auth,
  Department,
  Advisor,
});

export default rootReducer;
