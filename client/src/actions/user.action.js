import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (id) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}user/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
