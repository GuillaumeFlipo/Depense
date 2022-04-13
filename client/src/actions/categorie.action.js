import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_CATEGORIE = "ADD_CATEGORIE";
export const EDIT_CATEGORIE = "EDIT_CATEGORIE";
export const DELETE_CATEGORIE = "DELETE_CATEGORIE";

export const getCategories = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}categorie`)
      .then((res) => {
        dispatch({ type: GET_CATEGORIES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addCategorie = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}categorie`, data)
      .then((res) => {
        dispatch({ type: ADD_CATEGORIE, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const editCategorie = (data) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}categorie/${data.id}`,
      data: { ...data },
    })
      .then((res) => {
        dispatch({ type: EDIT_CATEGORIE, payload: { ...data } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteCategorie = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}categorie/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_CATEGORIE, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};
