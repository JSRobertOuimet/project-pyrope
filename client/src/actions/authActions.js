//==================================================
// Modules
import axios from "axios";
import jwt_decode from "jwt-decode";

// Constants
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE
} from "./types";

// Methods
import setAuthToken from "../utils/setAuthToken";
//==================================================

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/auth/register", userData)
    .then(res => history.push("/auth/sign-in"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const signInUser = userData => dispatch => {
  axios
    .post("/auth/sign-in", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const signOutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(clearCurrentProfile());
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};