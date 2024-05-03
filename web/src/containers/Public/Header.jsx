import { Link } from "react-router-dom";

import { useSelector } from "react-redux";



export default function Header() {
  return (
    <div className="bg-white-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-3 py-5">
        <div className="w-[20%] mr-10">
          <Link to={"/"}>
            <img
            
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
          
        </div>
      </div>
    </div>
  );
}
