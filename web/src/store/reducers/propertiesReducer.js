import actionTypes from "../actions/acctionTypes";

const initState = {
  properties: [],
  msg: "",
};

const propertiesReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROPERTIES:
      return {
        ...state,
        properties: action.properties || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};
export default propertiesReducer;
