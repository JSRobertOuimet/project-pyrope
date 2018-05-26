//==================================================
// Modules
import axios from "axios";

// Constants
import {
  GET_ERRORS,
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS
} from "./types";
//==================================================

export const fetchChallenges = () => {
  return {
    type: FETCH_CHALLENGES_REQUEST
  };
};

export const setChallenges = () => dispatch => {
  dispatch(fetchChallenges());

  axios
    .get("/challenges")
    .then(res =>
      dispatch({
        type: FETCH_CHALLENGES_SUCCESS,
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