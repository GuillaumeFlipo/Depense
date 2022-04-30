import {
  ADD_TRANSACREC,
  DELETE_TRANSACREC,
  EDIT_TRANSACREC,
  GET_TRANSACRECS,
} from "../actions/transactionRec.action";

const initialState = {};

export default function transactionRecReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACRECS:
      return action.payload;
    case ADD_TRANSACREC:
      return [action.payload, ...state];
    case EDIT_TRANSACREC:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            nom: action.payload.nom,
            somme: action.payload.somme,
            categorie: action.payload.categorie,
            comment: action.payload.comment,
            date: action.payload.date,
            month: action.payload.month,
            year: action.payload.year,
            reccurence: action.payload.reccurence,
          };
        } else return post;
      });
    case DELETE_TRANSACREC:
      return state.filter((post) => post.id !== action.payload.id);
    default:
      return state;
  }
}
