import actionTypes from "./acctionTypes";
import api from "../../services/genus";

export const getAllGenus = () => async (dispatch) => {
  try {
    const respone = await api.getAllGenus();
    // console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_GENUS,
        genus: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_GENUS,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_GENUS,
      genus: null,
    });
  }
};
