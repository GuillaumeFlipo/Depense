import { combineReducers } from "redux";
import pageReducer from "./page.reducer";
import transactionReducer from "./transaction.reducer";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import categorieReducer from "./categorie.reducer";
import depenseEventReducer from "./depensesEvent.reducer";
import transactionRecReducer from "./transactionRec.reducer";

export default combineReducers({
  transactionReducer,
  userReducer,
  pageReducer,
  categorieReducer,
  transactionRecReducer,
  depenseEventReducer,
  usersReducer,
});
