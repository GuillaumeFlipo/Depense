import {
  ADD_DEPEVENT,
  DELETE_DEPEVENT,
  EDIT_DEPEVENT,
  GET_DEPEVENTS,
} from "../actions/depensesEvent.action";

const initialState = {};

export default function depenseEventReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEPEVENTS:
      return action.payload;
    case ADD_DEPEVENT:
      return [action.payload, ...state];
    case EDIT_DEPEVENT:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            dateFin: action.payload.dateFin,
            month: action.payload.month,
            year: action.payload.year,
            dateDebut: action.payload.dateDebut,
            nom: action.payload.nom,
            comment: action.payload.comment,
          };
        } else return post;
      });
    case DELETE_DEPEVENT:
      return state.filter((post) => post.id != action.payload.id);
    default:
      return state;
  }
}
