import actionTypes from "./acctionTypes";
import api from "../../services/province.services";
export const getProvince = (id) => async (dispatch) => {
  try {
    const respone = await api.getProvince(id);
    // console.log(respone);
    if (respone?.error === 0) {
      dispatch({
        type: actionTypes.GET_PROVINCE,
        province: respone.respone,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROVINCE,
        msg: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROVINCE,
      province: null,
    });
  }
};

// export const getProperty = (id) => async (dispatch) => {
//   try {
//     const respone = await api.getProperty(id);
//     // console.log(respone.respone.rows);
//     if (respone?.error === 0) {
//       dispatch({
//         type: actionTypes.GET_PROPERTY_SPECIES,
//         detailspecies: respone.respone.rows,
//       });
//     } else {
//       dispatch({
//         type: actionTypes.GET_PROPERTY_SPECIES,
//         msg: respone.msg,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.GET_PROPERTY_SPECIES,
//       species: null,
//     });
//   }
// };
