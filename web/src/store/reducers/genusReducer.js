import actionTypes from "../actions/acctionTypes";

const initState = {
  genus: [],
  msg: "",
};

const genusReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENUS:
      return {
        ...state,
        genus: action.genus || [],
        msg: action.msg || "",
      };
    // case actionTypes.GET_ALLPROVINCE:
    //   return {
    //     ...state,
    //     province: action.province || [],
    //     msg: action.msg || "",
    //   };
    default:
      return state;
  }
};
export default genusReducer;
