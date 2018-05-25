import {
  FETCH_CURRENT_PROFILE_REQUEST,
  FETCH_CURRENT_PROFILE_SUCCESS,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profileLoading: false,
  profiles: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true
      };
    case FETCH_CURRENT_PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
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