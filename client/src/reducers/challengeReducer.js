import {
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS
} from "../actions/types";

const initialState = {
  challengesLoading: false,
  challenges: null,
  challenge: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_CHALLENGES_REQUEST:
      return {
        ...state,
        challengesLoading: true
      };
    case FETCH_CHALLENGES_SUCCESS:
      return {
        ...state,
        challengesLoading: false,
        challenges: action.payload
      };
    case FETCH_CHALLENGE_REQUEST:
      return {
        ...state,
        challengesLoading: true,
        challenge: action.payload
      };
    case FETCH_CHALLENGE_SUCCESS:
      return {
        ...state,
        challengesLoading: false,
        challenge: action.payload
      };
    default:
      return state;
  }
}