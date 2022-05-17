import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const ADD_TRANSACTION_EVENT = "ADD_TRANSACTION_EVENT";

export const getTransactions = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}transaction/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_TRANSACTIONS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addTransaction = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}transaction`,
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: ADD_TRANSACTION, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const addTransactionEvent = (data) => {
  return (dispatch) => {
    dispatch({ type: ADD_TRANSACTION_EVENT, payload: data });
  };
};

export const editTransaction = (data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}transaction/${data.id}`,
      data: { ...data },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: EDIT_TRANSACTION, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTransaction = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}transaction/${postId}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_TRANSACTION, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
