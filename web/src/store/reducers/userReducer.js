import actionTypes from "../actions/acctionTypes";

const initState = {
  currentData: {},
  alluser: []
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        currentData: action.currentData || {},
      };
      case actionTypes.GET_ALLUSER:
        return {
          ...state,
          alluser: action.alluser || [],
        };
    default:
      return state;
  }
};
export default userReducer;
