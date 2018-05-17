import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  errors: errorsReducer,
  auth: authReducer
});