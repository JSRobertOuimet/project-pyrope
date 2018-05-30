import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS
} from "../actions/types";

const initialState = {
  sessionsLoading: false,
  sessions: null
};

export default function(state = initialState, action) {
  switch(action.type) {
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
    default:
      return state;
  }
}