import axios from "axios";
import {
  GET_ERRORS,
  FETCH_CURRENT_PROFILE,
  SET_CURRENT_PROFILE,
} from "./types";

export const fetchCurrentProfile = () => {
  return {
    type: FETCH_CURRENT_PROFILE
  };
};

export const setCurrentProfile = () => dispatch => {
  dispatch(fetchCurrentProfile());

  axios
    .get("/dashboard")
    .then(res =>
      dispatch({
        type: SET_CURRENT_PROFILE,
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