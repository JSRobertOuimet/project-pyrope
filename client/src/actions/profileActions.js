import axios from "axios";
import {
  GET_ERRORS,
  FETCH_CURRENT_PROFILE_REQUEST,
  FETCH_CURRENT_PROFILE_SUCCESS,
  CREATE_PROFILE
} from "./types";

import { clearErrors } from "./errorActions";

export const fetchCurrentProfile = () => {
  return {
    type: FETCH_CURRENT_PROFILE_REQUEST
  };
};

export const setCurrentProfile = () => dispatch => {
  dispatch(clearErrors());
  dispatch(fetchCurrentProfile());

  axios
    .get("/profiles/me")
    .then(res =>
      dispatch({
        type: FETCH_CURRENT_PROFILE_SUCCESS,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/profiles/me", profileData)
    .then(res => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};