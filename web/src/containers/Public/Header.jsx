import { Link } from "react-router-dom";

import { useSelector } from "react-redux";



export default function Header() {
  //   const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-white-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-3 py-5">
        <div className="w-[20%] mr-10">
          <Link to={"/"}>
            <img
              // src="https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKIcGZXmQlfWB-dT25pYaCPyHG9eeW3oclfQ&usqp=CAU"
              alt="logo"
              className="w-[300px] h-[120px] object-contain ml-8 rounded-xl"
            />
          </Link>
        </div>

        <div className="w-[80%]">
          <div>
            <h3 className=" flex justify-center items-center text-5xl py-5 font-bold drop-shadow-2xl text-green-500">NGÂN HÀNG THÔNG TIN <br/> GIỐNG CÂY TRỒNG VÀ VẬT NUÔI</h3>
          </div>
          {/* <div className="flex justify-center items-center ">
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
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
