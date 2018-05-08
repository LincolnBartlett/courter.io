import { FETCH_IB_USER, EDIT_ICE_BREAKER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_IB_USER:
      return action.payload || false;
    case EDIT_ICE_BREAKER:
      return action.payload || false;
    default:
      return state;
  }
}
