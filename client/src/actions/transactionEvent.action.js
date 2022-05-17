import axios from "axios";

export const GET_TRANSACTION_EVENT = "GET_TRANSACTION_EVENT";
export const ADD_TRANSACTION_EVENT = "ADD_TRANSACTION_EVENT";

export const getTransactionsEvent = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}transaction/depensesEvent/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_TRANSACTION_EVENT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addTransactionEvent_event = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}transaction`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: ADD_TRANSACTION_EVENT, payload: data });
      })
      .catch((err) => console.log(err));
  };
};
