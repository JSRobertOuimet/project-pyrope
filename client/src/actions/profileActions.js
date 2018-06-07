import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  FETCH_CURRENT_PROFILE_REQUEST,
  FETCH_CURRENT_PROFILE_SUCCESS,
  CREATE_PROFILE
} from "./types";
import { clearErrors } from "../actions/errorActions";
import { clearCurrentProfile } from "../actions/authActions";

export const fetchCurrentProfile = () => {
  return {
    type: FETCH_CURRENT_PROFILE_REQUEST
  };
};

export const setCurrentProfile = () => dispatch => {
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

export const createProfile = profileData => dispatch => {
  axios
    .post("/profiles/me", profileData)
    .then(res => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteProfile = () => dispatch => {
  axios
    .delete("/profiles/me")
    .then(() => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      dispatch(clearCurrentProfile());
      dispatch(clearErrors());
    });
};