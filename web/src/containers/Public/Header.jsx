import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Header() {
  //   const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <div className="w-[20%] mr-10">
          <Link to={"/"}>
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png"
              alt="logo"
              className="w-[300px] h-[120px] object-contain ml-16 "
            />
          </Link>
        </div>

        <div className="w-[80%]">
          <div>
            <h3 className=" flex justify-center items-center text-3xl py-5 font-bold text-white drop-shadow-2xl">NGÂN HÀNG THÔNG TIN GIỐNG CÂY TRỒNG VÀ VẬT NUÔI</h3>
          </div>
          <div className="flex justify-center items-center ">
            <ul className="flex gap-4">
              <Link to="/">
                <li className="text-xl  hover:opacity-90 hover:text-red-300">Home</li>
              </Link>
              <Link to="/about">
                <li className="text-xl  hover:opacity-90 hover:text-red-300">About</li>
              </Link>
              <Link to="/sign-in">
                <li className="text-xl  hover:opacity-90 hover:text-red-300">SignIn</li>
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
      </div>
    </div>
  );
}
