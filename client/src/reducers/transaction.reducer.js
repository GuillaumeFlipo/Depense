import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  GET_TRANSACTIONS,
  ADD_TRANSACTION_EVENT,
} from "../actions/transaction.action";

const initialState = {};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.payload;
    case ADD_TRANSACTION:
      return [action.payload, ...state];
    case ADD_TRANSACTION_EVENT:
      return [action.payload, ...state];
    case EDIT_TRANSACTION:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            dateString: action.payload.dateString,
            nom: action.payload.nom,
            somme: action.payload.somme,
            comment: action.payload.comment,
          };
        } else return post;
      });
    case DELETE_TRANSACTION:
      return state.filter((post) => post.id !== action.payload.postId);
    default:
      return state;
  }
}
