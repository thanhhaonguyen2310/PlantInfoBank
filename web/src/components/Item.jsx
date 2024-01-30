import React,{ memo } from 'react'
import {  useNavigate, Link } from 'react-router-dom'
// import { path } from '../ultils/constant'
// import { DetailPost } from '../containers/Public'
import {useDispatch, useSelector} from 'react-redux'

import * as  actions from '../store/actions';


const Item = ({item}) => {
  const dispatch = useDispatch()

  // const navigate = useNavigate()
  // console.log(id)
  // console.log(item)
  return (
    <div className='w-full   items-center p-3 m-2'
    //   onClick = {()=> {
    //       dispatch(actions.editPost({image,title, id}))
    //    }}
    >
        <Link to= {`/detailgen/${item?.name}`} 
            className='w-[40%]'>          
            <img src= {item?.DetailImages?.Image?.url || item?.DetailImages[0]?.Image?.url}        
                alt=""
                className='object-cover w-[300px] h-[200px]'                
                />
        </Link>
        <div className="w-[60%]">
            <h2 className="post-title is-large font-sans text-xl font-bold text-lime-800 justify-items-center">Mẫu giống {item?.name}</h2>
			      {/* <div className="is-divider"></div> */}
			
         </div>
    </div>
  )
}

export default memo(Item)