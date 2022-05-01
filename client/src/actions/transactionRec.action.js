import axios from "axios";

export const GET_TRANSACRECS = "GET_TRANSACRECS";
export const ADD_TRANSACREC = "ADD_TRANSACREC";
export const EDIT_TRANSACREC = "EDIT_TRANSACREC";
export const DELETE_TRANSACREC = "DELETE_TRANSACREC";

export const getTransactionRecs = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}transactionRec/${id}`)
      .then((res) => {
        dispatch({ type: GET_TRANSACRECS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addTransactionRec = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}transactionRec`, data)
      .then((res) => {
        dispatch({ type: ADD_TRANSACREC, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const editTransactionRec = (data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}transactionRec/${data.id}`,
      data: { ...data },
    })
      .then((res) => {
        dispatch({ type: EDIT_TRANSACREC, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteTransactionRec = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}transactionRec/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_TRANSACREC, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};
