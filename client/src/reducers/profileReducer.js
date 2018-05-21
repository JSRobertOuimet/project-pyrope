import {
  FETCH_CURRENT_PROFILE,
  SET_CURRENT_PROFILE,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  loading: false,
  profiles: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_PROFILE:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};