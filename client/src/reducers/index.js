import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import challengeReducer from "./challengeReducer";

export default combineReducers({
  errors: errorsReducer,
  auth: authReducer,
  profile: profileReducer,
  challenge: challengeReducer
});