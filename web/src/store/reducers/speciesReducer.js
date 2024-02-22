import actionTypes from "../actions/acctionTypes";

const initState = {
  species: [],
  detailspecies: [],
  msg: "",
  datafilter: {},
  listAddspecies: [],
};

const speciesReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_SPECIES:
      return {
        ...state,
        species: action.species || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_FILTERSPECIES:
      return {
        ...state,
        species: action.species || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ADDSPECIES:
      return {
        ...state,
        listAddspecies: action.listAddspecies || [],
        msg: action.msg || "",
      };
      case actionTypes.GET_ALLADDSPECIES:
        return {
          ...state,
          listAddspecies: action.listAddspecies || [],
          msg: action.msg || "",
        };
    case actionTypes.GET_PROPERTY_SPECIES:
      return {
        ...state,
        detailspecies: action.detailspecies || [],
        msg: action.msg || "",
      };
    case actionTypes.SAVE_SPECIES:
      return {
        ...state,
        datafilter: action.datafilter || {},
      };
    default:
      return state;
  }
};
export default speciesReducer;
