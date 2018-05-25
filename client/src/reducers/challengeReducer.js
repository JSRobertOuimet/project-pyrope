import {
  // FETCH_CHALLENGES,
  // SET_CHALLENGES,
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS
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
    default:
      return state;
  }
}