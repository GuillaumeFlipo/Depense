import {
  GET_CATEGORIES,
  ADD_CATEGORIE,
  EDIT_CATEGORIE,
  DELETE_CATEGORIE,
} from "../actions/categorie.action";

const initialState = {};

export default function categorieReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;
    case ADD_CATEGORIE:
      return [action.payload, ...state];
    case EDIT_CATEGORIE:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            nom: action.payload.nom,
          };
        } else return post;
      });

    case DELETE_CATEGORIE:
      return state.filter((post) => post.id !== action.payload.postId);
    default:
      return state;
  }
}
