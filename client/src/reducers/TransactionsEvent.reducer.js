import {
  GET_TRANSACTION_EVENT,
  ADD_TRANSACTION_EVENT,
} from "../actions/transactionEvent.action";

const initialState = {};

export default function TransactionsEventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION_EVENT:
      return action.payload;
    case ADD_TRANSACTION_EVENT:
      return [action.payload, ...state];
    default:
      return state;
  }
}
