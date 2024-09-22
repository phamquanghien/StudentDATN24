import { combineReducers } from 'redux';
import Auth from './Auth/slice';

const rootReducer = combineReducers({
  Auth,
});

export default rootReducer;
