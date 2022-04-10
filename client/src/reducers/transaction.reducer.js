import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  GET_TRANSACTIONS,
  UPLOAD_ADD,
  UPLOAD_EDIT,
} from "../actions/transaction.action";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.payload;
    case ADD_TRANSACTION:
      return [action.payload, ...state];
    case EDIT_TRANSACTION:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            text: action.payload.text,
          };
        } else return post;
      });
    case UPLOAD_EDIT:
      return [...state];
    case UPLOAD_ADD:
      return [...state, action.payload];
    case DELETE_TRANSACTION:
      return state.filter((post) => post.id !== action.payload.postId);
    default:
      return state;
  }
}
