import {
  FETCH_CURRENT_PROFILE_REQUEST,
  FETCH_CURRENT_PROFILE_SUCCESS,
  CREATE_PROFILE,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profilesLoading: false,
  profiles: null,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_PROFILE_REQUEST:
      return {
        ...state,
        profilesLoading: true
      };
    case FETCH_CURRENT_PROFILE_SUCCESS:
      return {
        ...state,
        profilesLoading: false,
        profile: action.payload
      };
    case CREATE_PROFILE:
      return {
        ...state,
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