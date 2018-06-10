import {
  FETCH_ALL_SESSIONS_REQUEST,
  FETCH_ALL_SESSIONS_SUCCESS,
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  CLEAR_CURRENT_SESSIONS
} from "../actions/types";

const initialState = {
  sessionsLoading: false,
  allSessions: null,
  sessions: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_ALL_SESSIONS_REQUEST:
      return {
        ...state,
        sessionsLoading: true
      };
    case FETCH_ALL_SESSIONS_SUCCESS:
      return {
        ...state,
        sessionsLoading: false,
        allSessions: action.payload
      };
    case FETCH_SESSIONS_REQUEST:
      return {
        ...state,
        sessionsLoading: true
      };
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        sessionsLoading: false,
        sessions: action.payload
      };
    case CLEAR_CURRENT_SESSIONS:
      return {
        ...state,
        sessions: null
      };
    default:
      return state;
  }
}