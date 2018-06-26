import {
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  CLEAR_CURRENT_CHALLENGE,
  FETCH_BOOK_SUGGESTIONS_REQUEST,
  FETCH_BOOK_SUGGESTIONS_SUCCESS,
  CLEAR_BOOK_SUGGESTIONS
} from "../actions/types";

const initialState = {
  challengesLoading: false,
  challenges: null,
  challenge: null,
  suggestionsLoading: false,
  bookSuggestions: null
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
        challengesLoading: true
      };
    case FETCH_CHALLENGE_SUCCESS:
      return {
        ...state,
        challengesLoading: false,
        challenge: action.payload
      };
    case FETCH_BOOK_SUGGESTIONS_REQUEST:
      return {
        ...state,
        suggestionsLoading: true
      };
    case FETCH_BOOK_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestionsLoading: false,
        bookSuggestions: action.payload
      };
    case CLEAR_BOOK_SUGGESTIONS:
      return {
        ...state,
        bookSuggestions: null
      };
    case CLEAR_CURRENT_CHALLENGE:
      return {
        ...state,
        challenge: null
      };
    default:
      return state;
  }
}