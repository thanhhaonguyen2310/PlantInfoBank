import actionTypes from "../actions/acctionTypes";

const initState = {
  properties: [],
  propertiesID: [],
  propertygenus: [],
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
    case actionTypes.GET_PROPERTIESID:
      return {
        ...state,
        propertiesID: action.properties || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PROPERTIES_GENUS:
      return {
        ...state,
        propertygenus: action.properties || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};
export default propertiesReducer;
