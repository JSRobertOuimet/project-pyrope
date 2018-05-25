import axios from "axios";
import {
  GET_ERRORS,
  FETCH_CURRENT_PROFILE_REQUEST,
  FETCH_CURRENT_PROFILE_SUCCESS
} from "./types";

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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};