import { GET_TRANSACTIONSEVENT } from "../actions/transaction.action";

const initialState = {};

export default function TransactionsEventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONSEVENT:
      return action.payload;
    default:
      return state;
  }
}
