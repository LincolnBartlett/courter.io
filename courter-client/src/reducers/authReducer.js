import {
  FETCH_USER,
  SET_TUTORIAL,
  SET_ALL_USER_IB_PREFS,
  SET_ALL_USER_INFO,
  SET_USER_LOCATION
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case SET_USER_LOCATION:
      return action.payload || false;
    case SET_ALL_USER_INFO:
      return action.payload || false;
    case SET_ALL_USER_IB_PREFS:
      return action.payload || false;
    case SET_TUTORIAL:
      return action.payload || false;
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
