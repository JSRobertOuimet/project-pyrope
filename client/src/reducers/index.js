import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  errors: errorsReducer,
  auth: authReducer,
  profile: profileReducer
});