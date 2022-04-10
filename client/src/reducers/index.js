import { combineReducers } from "redux";
import pageReducer from "./page.reducer";
import transactionReducer from "./transaction.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  transactionReducer,
  userReducer,
  pageReducer,
});
