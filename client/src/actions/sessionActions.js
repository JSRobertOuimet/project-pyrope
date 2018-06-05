//==================================================
// Modules
import axios from "axios";

// Constants
import {
  GET_ERRORS,
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS
} from "./types";
//==================================================

export const fetchSessions = () => {
  return {
    type: FETCH_SESSIONS_REQUEST
  };
};

export const setSessions = id => dispatch => {
  dispatch(fetchSessions());

  axios
    .get(`/challenges/${id}/sessions`)
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