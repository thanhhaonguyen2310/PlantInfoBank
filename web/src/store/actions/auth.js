import actionTypes from "./acctionTypes";
import * as api from "../../services/user.services";
export const register = (payload) => async (dispatch) => {
  try {
    const respone = await api.apiRegister(payload);
    console.log(respone);
    if (respone?.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: respone.token,
        // idCurrent: respone.respone[0].id,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: respone.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};
export const login = (payload) => async (dispatch) => {
  try {
    const response = await api.apiLogin(payload);
    // console.log(response);
    if (response?.data?.err === 0) {
      
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response?.data?.token,
        // idCurrent: response?.data?.response.id,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response.msg,
      });
    }
  } catch (error) {
    // console.log(console.error)
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: null,
    });
  }
};

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

// export const getUser = () => async (dispatch) => {
//   try {
//     const respone = await apiGetUser();
//     if (respone?.msg === "OK") {
//       dispatch({
//         // truyền mảng lưu trong redux
//         type: actionTypes.GET_USER,
//         data: respone,
//       });
//     } else {
//       dispatch({
//         type: actionTypes.GET_USER,
//         msg: respone.msg,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.GET_USER,
//       user: null,
//     });
//   }
// };

export const editUser = (dataEdit) => ({
  type: actionTypes.EDIT_USER,
  dataEdit,
});

// export const deleteUser = (userId) => async (dispatch) =>{
//     try {
//         const respone = await apiDeleteUser(userId)
//         // console.log(respone.data)
//         if (respone?.data.msg  === "OK"){
//             dispatch({
//                 // truyền mảng lưu trong redux
//                 type: actionTypes.GET_USER,
//                 data: respone.data,

//             })
//         }
//         else {
//              dispatch({
//                 type: actionTypes.GET_USER,
//                 msg: respone.data.msg
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type: actionTypes.GET_USER,
//             data:null
//         })
//     }
// }
