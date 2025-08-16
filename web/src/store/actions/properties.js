import actionTypes from "./acctionTypes";
import api from "../../services/properties.services";
export const getProperties = (id) => async (dispatch) => {
  try {
    const respone = await api.getProperties(id);
    console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_PROPERTIES,
        properties: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROPERTIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROPERTIES,
      properties: null,
    });
  }
};

export const getPropertyID = (id) => async (dispatch) => {
  try {
    const respone = await api.getPropertyID(id);
    console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_PROPERTIESID,
        properties: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROPERTIESID,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROPERTIESID,
      properties: null,
    });
  }
};

export const getPropertiesGenus = (id) => async (dispatch) => {
  try {
    const respone = await api.getPropertiesGenus(id);
    console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_PROPERTIES_GENUS,
        properties: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROPERTIES_GENUS,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROPERTIES_GENUS,
      properties: null,
    });
  }
};