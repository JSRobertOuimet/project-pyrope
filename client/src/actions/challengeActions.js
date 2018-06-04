//==================================================
// Modules
import axios from "axios";

// Constants
import {
  GET_ERRORS,
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS
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

export const fetchChallenge = () => {
  return {
    type: FETCH_CHALLENGE_REQUEST
  };
};

export const setChallenge = id => dispatch => {
  dispatch(fetchChallenge());

  axios
    .get(`/challenges/${id}`)
    .then(res =>
      dispatch({
        type: FETCH_CHALLENGE_SUCCESS,
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

export const createChallenge = newChallenge => dispatch => {
  axios
    .post("/challenges/create", newChallenge)
    .then(() => dispatch(setChallenges()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};