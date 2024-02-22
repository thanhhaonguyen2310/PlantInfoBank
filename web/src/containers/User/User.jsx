import React, {useEffect,useState} from 'react'
import Sidebar from './Sidebar'
import { useParams } from 'react-router-dom';
import { getCurrent } from '../../store/actions/user'
import {useDispatch, useSelector} from 'react-redux'
import PageContent from '../System/Admin/PageContent';

export const User = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch()
  const {idCurrent} = useSelector(state => state.auth)
  // const {user }=  useSelector(state  =>  state.user)
  // console.log(idCurrent)

  useEffect(() => {
    dispatch(getCurrent(idCurrent))
  },[])
  return (
    <div className=' flex  justify-between min-h-screen py-2 px-20 bg-white-300'>
      {/* <div className=""><Navbar /></div> */}
      <div className='w-[20%] h-screen px-5 py-8 overflow-y-auto bg-white  dark:bg-gray-900 dark:border-gray-700'>
        <Sidebar/>
      </div>  
      <div className="main w-[80%]  mt-[20px] flex flex-1 justify-between">
        <PageContent/>
      </div>
    </div>
  )
}
