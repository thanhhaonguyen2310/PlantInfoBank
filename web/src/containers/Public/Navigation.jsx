import React from "react";
import { Link } from "react-router-dom";
// import {useDispatch, useSelector} from 'react-redux'

const Navigation = () => {
  //   const {currentData} = useSelector(state => state.user)
  //   const { isLoggedIn } = useSelector(state => state.auth)
  //   console.log(currentData)
  return (
    <div className="w-full ">
      <div className="flex justify-center items-center ">
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-xl  hover:opacity-90 hover:text-red-300 uppercase">
              Trang chủ
            </li>
          </Link>
          <Link to="/about">
            <li className="text-xl  hover:opacity-90 hover:text-red-300 uppercase">
              Giới thiệu
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-xl  hover:opacity-90 hover:text-red-300 uppercase">
              Đăng nhập
            </li>
          </Link>
          {/* <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li className="text-xl  hover:opacity-90 hover:text-green-300">Sign In</li>
            )}
          </Link> */}
      
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
