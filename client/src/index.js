import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./style/index.scss";
import App from "./App.js";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { getMeasures } from "./actions/page.action";
import { getCategories } from "./actions/categorie.action";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getMeasures());

window.onresize = function () {
  store.dispatch(getMeasures());
};
window.addEventListener("scroll", function () {
  store.dispatch(getMeasures());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
