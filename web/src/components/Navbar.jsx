import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import logo from '../../assets/logo.png'
// import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
// import '@fortawesome/fontawesome-free/css/solid.min.css';

function Navbar() {
  const [showDataDropdown, setShowDataDropdown] = useState(false);

  const handleDataHover = () => {
    setShowDataDropdown(true);
  };

  const handleDataLeave = () => {
    setShowDataDropdown(false);
  };

  return (
    <nav className="w-[90%] md:w-[80%] px-[10px] md:py-[20px] mx-auto   flex justify-between items-center gap-10">
      <div className=" flex justify-center items-center space-x-2 gap-8 w-[60%] relative">
        <ul className="hidden md:flex space-x-103  justify-center items-center gap-12 text-xl pb-5 mb-3 relative z-50">
          {/* <li>
            <img
              className="w-[100%] h-[92px] md:pr-[300px] cursor-pointer mt-4"
              src='https://upload.wikimedia.org/wikipedia/vi/thumb/6/6c/Logo_Dai_hoc_Can_Tho.svg/2048px-Logo_Dai_hoc_Can_Tho.svg.png'
            />
          </li> */}
          <li className=" mt-11">
            <NavLink
              to="/"
              className="text-darkGrayishBlue transition-all hover:border-t-4  border-green-700 hover:pt-[13px] hover:text-black"
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className=" mt-11">
            <NavLink
              to="/about"
              className="text-darkGrayishBlue transition-all hover:border-t-4 border-green-700 hover:pt-[13px] hover:text-black"
            >
              Giới Thiệu
            </NavLink>
          </li>
          <li
            className=" mt-11 relative group"
            onMouseEnter={handleDataHover}
            onMouseLeave={handleDataLeave}
          >
            <NavLink
              to="/data"
              className="text-darkGrayishBlue transition-all hover:border-t-4 border-green-700 hover:pt-[13px] hover:text-black"
            >
              Dữ liệu
            </NavLink>
            {showDataDropdown && (
              <div className="absolute  right-0 top-5 mt-2 bg-white shadow-lg rounded-md overflow-hidden flex space-x-4 p-5 h-auto w-[400px]">
                <NavLink
                  to="/genus/1"
                  className="text-base text-darkGrayishBlue hover:text-green-400"
                >
                  Giống lúa
                </NavLink>
                <NavLink
                  to="/genus/2"
                  className="text-base text-darkGrayishBlue hover:text-green-400"
                >
                  Giống ngô
                </NavLink>
                <NavLink
                  to="/genus/3"
                  className="text-base text-darkGrayishBlue hover:text-green-400"
                >
                  Giống dưa thơm
                </NavLink>
				
                <NavLink
                  to="/genus/4"
                  className="text-base text-darkGrayishBlue hover:text-green-400"
                >
                  Giống sen
                </NavLink>
                
              </div>
            )}
          </li>
        </ul>
      </div>
      <ul className="flex justify-center items-center gap-3">
        <div className="relative text-gray-600 border-2">
          <input
            type="search"
            name="search"
            placeholder="Tìm kiếm..."
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-2 mr-6 transition-colors duration-300 hover:bg-green-509"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <li className="ml-3">
          <NavLink to="/sign-in">Sign In</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
