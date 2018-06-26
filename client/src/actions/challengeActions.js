//==================================================
// Modules
import axios from "axios";

// Constants
import {
  GET_ERRORS,
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_BOOK_SUGGESTIONS_REQUEST,
  FETCH_BOOK_SUGGESTIONS_SUCCESS,
  CLEAR_BOOK_SUGGESTIONS,
  CLEAR_CURRENT_CHALLENGE,
  CLEAR_CURRENT_SESSIONS
} from "./types";
//==================================================

export const fetchChallenges = () => {
  return {
    type: FETCH_CHALLENGES_REQUEST
  };
};

export const fetchChallenge = () => {
  return {
    type: FETCH_CHALLENGE_REQUEST
  };
};

export const fetchBookSuggestions = () => {
  return {
    type: FETCH_BOOK_SUGGESTIONS_REQUEST
  };
};

export const clearBookSuggestions = () => {
  return {
    type: CLEAR_BOOK_SUGGESTIONS
  };
};

export const clearCurrentChallenge = () => {
  return {
    type: CLEAR_CURRENT_CHALLENGE
  };
};

export const clearCurrentSessions = () => {
  return {
    type: CLEAR_CURRENT_SESSIONS
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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createChallenge = newChallenge => dispatch => {
  axios
    .post("/challenges/create", newChallenge)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getBookSuggestions = searchTerms => dispatch => {
  const config = {
    transformRequest: [(data, headers) => {
      delete headers.common.Authorization;
      return data;
    }]
  };

  dispatch(fetchBookSuggestions());

  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerms}`, config)
    .then(res =>
      dispatch({
        type: FETCH_BOOK_SUGGESTIONS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteChallenge = (challengeId, history) => dispatch => {
  axios
    .delete(`/challenges/${challengeId}`)
    .then(() => {
      dispatch(clearCurrentChallenge());
      dispatch(clearCurrentSessions());
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};