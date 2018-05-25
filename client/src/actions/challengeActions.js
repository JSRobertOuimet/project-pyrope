//==================================================
// Modules
import axios from "axios";

// Constants
import {
  GET_ERRORS,
  FETCH_CHALLENGES,
  SET_CHALLENGES,
  FETCH_CURRENT_CHALLENGE,
  SET_CURRENT_CHALLENGE
} from "./types";
//==================================================

export const fetchChallenges = () => {
  return {
    type: FETCH_CHALLENGES
  };
};

export const fetchCurrentChallenge = () => {
  return {
    type: FETCH_CURRENT_CHALLENGE
  };
};

export const setChallenges = () => dispatch => {
  dispatch(fetchChallenges());

  axios
    .get("/challenges")
    .then(res =>
      dispatch({
        type: SET_CHALLENGES,
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

export const setCurrentChallenge = (id) => dispatch => {
  dispatch(fetchCurrentChallenge());

  axios
    .get(`/challenges/${id}`)
    .then(res =>
      dispatch({
        type: SET_CURRENT_CHALLENGE,
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