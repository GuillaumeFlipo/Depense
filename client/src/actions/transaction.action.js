import axios from "axios";

export const GET_TRANSACTIONS = "GET_TRANSACTIONS";
export const GET_TRANSACTIONSEVENT = "GET_TRANSACTIONSEVENT";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const UPLOAD_EDIT = "UPLOAD_PICTURE_EDIT";
export const UPLOAD_ADD = "UPLOAD_PICTURE_ADD";

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

export const getTransactionsEvent = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}transaction/depensesEvent/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_TRANSACTIONSEVENT, payload: res.data });
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
