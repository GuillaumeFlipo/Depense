import { GET_MEASURES } from "../actions/page.action";

const initialState = {};

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEASURES:
      return action.payload;
    default:
      return state;
  }
}
