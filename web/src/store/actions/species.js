import actionTypes from "./acctionTypes";
import api from "../../services/species.services";
export const getSpecies = (id,page) => async (dispatch) => {
  try {
    const respone = await api.getSpecies(id,page);
    // console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_SPECIES,
        species: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_SPECIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SPECIES,
      species: null,
    });
  }
};

export const getProperty = (id) => async (dispatch) => {
  try {
    const respone = await api.getProperty(id);
    // console.log(respone.respone.rows);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_PROPERTY_SPECIES,
        detailspecies: respone.respone.rows,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROPERTY_SPECIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROPERTY_SPECIES,
      species: null,
    });
  }
};
