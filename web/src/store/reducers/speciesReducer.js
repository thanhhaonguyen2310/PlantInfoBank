import actionTypes from "../actions/acctionTypes";

const initState = {
  species: [],
  detailspecies: [],
  msg: "",
};

const speciesReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SPECIES:
      return {
        ...state,
        species: action.species || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PROPERTY_SPECIES:
        return {
          ...state,
          detailspecies: action.detailspecies || [],
          msg: action.msg || "",
        };
    default:
      return state;
  }
};
export default speciesReducer;
