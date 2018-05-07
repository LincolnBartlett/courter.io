import { FETCH_ONE_USER, SET_ALL_USER_INFO } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ONE_USER:
      return action.payload || false;
    case SET_ALL_USER_INFO:
      return action.payload || false;
    default:
      return state;
  }
}
