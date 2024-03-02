import actionTypes from "./acctionTypes";
import api from "../../services/species.services";
export const getSpecies = (id, page) => async (dispatch) => {
  try {
    const respone = await api.getSpecies(id, page);
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

export const getFilterSpecies = (datafilter) => async (dispatch) => {
  try {
    const respone = await api.getFilterSpecies(datafilter);
    console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_FILTERSPECIES,
        species: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_FILTERSPECIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FILTERSPECIES,
      species: null,
    });
  }
};

export const getAllAddSpecies = () => async (dispatch) => {
  try {
    const respone = await api.getAllAddSpecies();
    console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_ADDSPECIES,
        listAddspecies: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ADDSPECIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ADDSPECIES,
      listAddspecies: null,
    });
  }
};

export const getAddSpecies = (id) => async (dispatch) => {
  try {
    const respone = await api.getAddSpecies(id);
    // console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_ALLADDSPECIES,
        listAddspecies: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALLADDSPECIES,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALLADDSPECIES,
      listAddspecies: null,
    });
  }
};

export const saveSpecies = (datafilter) => ({
  type: actionTypes.SAVE_SPECIES,
  datafilter,
});
