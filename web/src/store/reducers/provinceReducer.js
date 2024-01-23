import actionTypes from "../actions/acctionTypes";

const initState = {
  province: [],
  msg: "",
};

const provinceReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROVINCE:
      return {
        ...state,
        province: action.province || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};
export default provinceReducer;
