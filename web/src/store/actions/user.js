import actionTypes from "./acctionTypes";
import * as apis from "../../services/user.services";

export const getCurrent = () => async (dispatch) =>{
  try {
      const respone = await apis.apiGetCurrent()
      if (respone?.data.msg  === "OK"){
          dispatch({
              // truyền mảng lưu trong redux
              type: actionTypes.GET_CURRENT,
              currentData: respone.data.respone

          })
      }
      else {
           dispatch({
              type: actionTypes.GET_CURRENT,
              msg: respone.data.msg,
              currentData: null
          })
        //   dispatch({
        //       type: actionTypes.LOGOUT,
              
        //   })
      }
  } catch (error) {
      dispatch({
          type: actionTypes.GET_CURRENT,
          msg: error,
          currentData:null
      })
      dispatch({
              type: actionTypes.LOGOUT,
              
          })
  }
}

export const getAllUser = () => async (dispatch) =>{
    try {
        const respone = await apis.apiGetAllUser()
        console.log(respone)
        if (respone?.data.msg  === "OK"){
            dispatch({
                // truyền mảng lưu trong redux
                type: actionTypes.GET_ALLUSER,
                alluser: respone.data.respone
  
            })
        }
        else {
             dispatch({
                type: actionTypes.GET_ALLUSER,
                msg: respone.data.msg,
                alluser: null
            })
           
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALLUSER,
            msg: error,
            alluser:null
        })
        
    }
  }