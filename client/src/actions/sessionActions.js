//==================================================
// Modules
import axios from "axios";

// Constants
import {
  GET_ERRORS,
  FETCH_ALL_SESSIONS_REQUEST,
  FETCH_ALL_SESSIONS_SUCCESS,
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS
} from "./types";
//==================================================

export const fetchAllSessions = () => {
  return {
    type: FETCH_ALL_SESSIONS_REQUEST
  };
};

export const fetchSessions = () => {
  return {
    type: FETCH_SESSIONS_REQUEST
  };
};

export const setAllSessions = () => dispatch => {
  dispatch(fetchAllSessions());

  axios
    .get("/sessions")
    .then(res =>
      dispatch({
        type: FETCH_ALL_SESSIONS_SUCCESS,
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

export const setSessions = challengeId => dispatch => {
  dispatch(fetchSessions());

  axios
    .get(`/challenges/${challengeId}/sessions`)
    .then(res =>
      dispatch({
        type: FETCH_SESSIONS_SUCCESS,
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

export const createSession = (sessionData, id) => dispatch => {
  axios
    .post(`/challenges/${id}/sessions`, sessionData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};