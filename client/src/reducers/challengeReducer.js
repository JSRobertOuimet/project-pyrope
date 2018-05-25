import {
  FETCH_CHALLENGES,
  SET_CHALLENGES,
  FETCH_CURRENT_CHALLENGE,
  SET_CURRENT_CHALLENGE
} from "../actions/types";

const initialState = {
  loading: false,
  challenges: null,
  challenge: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_CHALLENGES:
      return {
        ...state,
        loading: true
      };
    case SET_CHALLENGES:
      return {
        ...state,
        loading: false,
        challenges: action.payload
      };
    case FETCH_CURRENT_CHALLENGE:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_CHALLENGE:
      return {
        ...state,
        loading: false,
        challenge: action.payload
      };
    default:
      return state;
  }
}