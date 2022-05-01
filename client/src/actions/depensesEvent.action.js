import axios from "axios";

export const GET_DEPEVENTS = "GET_DEPEVENTS";
export const ADD_DEPEVENT = "ADD_DEPEVENT";
export const EDIT_DEPEVENT = "EDIT_DEPEVENT";
export const DELETE_DEPEVENT = "DELETE_DEPEVENT";

export const getDepenseEvents = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}depensesEvent/${id}`)
      .then((res) => {
        dispatch({ type: GET_DEPEVENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addDepenseEvent = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}depensesEvent`, data)
      .then((res) => {
        dispatch({ type: ADD_DEPEVENT, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const editDepenseEvent = (data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}depensesEvent/${data.id}`,
      data: { ...data },
    })
      .then((res) => {
        dispatch({ type: EDIT_DEPEVENT, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteDepenseEvent = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}depensesEvent/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_DEPEVENT, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};
