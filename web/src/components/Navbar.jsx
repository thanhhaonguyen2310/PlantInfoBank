import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../src/store/actions/auth";
import api from "../../src/services/species.services";
import { getCurrent } from "../../src/store/actions/user";
import menuManage from "../../src/ultils/menuManege";
import { AiOutlineLogout } from "react-icons/ai";

import { MdManageAccounts } from "react-icons/md";
import { FaUserAlt, FaSearch, FaUser } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalFilter from "./ModalFilter";

function Navbar() {
  const [showDataDropdown, setShowDataDropdown] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  // const { detailspecies } = useSelector((state) => state.species);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(actions.getId(formData))

    const respone = await api.getIdSpecies(formData?.search);
    console.log(respone.msg);

    respone.msg === "OK"
      ? navigate(`/detailgen/${formData?.search}`)
      : toast.error("Không tìm thấy mẫu giống này!", {
          position: "top-right",
        });
    setFormData({});
  };
  const searchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(formData);
    }
  };
  const handleDataHover = () => {
    setShowDataDropdown(true);
  };

  const handleDataLeave = () => {
    setShowDataDropdown(false);
  };

  const handleFilterHover = () => {
    setshowfilter(true);
  };

  const handleFilterLeave = () => {
    setshowfilter(false);
  };
  const handleClick = (event) => {
    // Lấy giá trị id từ thẻ <li>
    const showId = event.target.id;
    setIdModal(showId);
    setIsShowModal(true);
    // console.log('ID của thẻ <li> được click:', showId);
  };
  useEffect(() => {
    dispatch(getCurrent());
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className="bg-green-600 shadow-lg flex justify-between items-center py-2 mx-auto"
      style={{
        marginLeft: "0px",
        marginRight: "-70px",
        paddingBottom: "0px",
        marginBottom: "40px",
        paddingTop: "0px",
      }}
    >
      <ul
        className="hidden md:flex space-x-103  justify-center items-center gap-12 text-xl pb-5 mb-3 relative z-50"
        style={{ marginLeft: "145px" }}
      >
        <li className=" mt-11">
          <NavLink
            to="/"
            className="text-darkGrayishBlue transition-all hover:border-t-4  border-white-700 hover:pt-[13px] hover:text-black"
          >
            Trang Chủ
          </NavLink>
        </li>
        {/* <li className=" mt-11">
          <NavLink
            to="/about"
            className="text-darkGrayishBlue transition-all hover:border-t-4 border-white-700 hover:pt-[13px] hover:text-black"
          >
            Giới Thiệu
          </NavLink>
        </li> */}
        <li
          className=" mt-11 relative group"
          onMouseEnter={handleDataHover}
          onMouseLeave={handleDataLeave}
        >
          <NavLink
            to="/data"
            className="text-darkGrayishBlue transition-all hover:border-t-4 border-white-700 hover:pt-[13px] hover:text-black"
          >
            Giống Cây
          </NavLink>
          {showDataDropdown && (
            <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-300">
              <div className="py-1">
                {[
                  { id: 1, label: "Giống lúa" },
                  { id: 2, label: "Giống ngô" },
                  { id: 3, label: "Giống dưa thơm" },
                  { id: 4, label: "Giống lan" },
                  { id: 5, label: "Giống đậu nành" },
                ].map((item, index) => (
                  <NavLink
                    key={item.id}
                    to={`/genus/${item.id}`}
                    className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-200 hover:text-green-500"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </li>
        <li
          className=" mt-11 relative group"
          onMouseEnter={handleFilterHover}
          onMouseLeave={handleFilterLeave}
        >
          <NavLink
            to="/data"
            className="text-darkGrayishBlue transition-all hover:border-t-4 border-white-700 hover:pt-[13px] hover:text-black"
          >
            Bộ Lọc
          </NavLink>
          {showfilter && (
            <div className="absolute top-7 left-0 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-50">
              <div className="p-4 mb-1 mt-1 pt-1 pb-1 text-center">
                <p className="text-red-500 font-bold text-lg">
                  Hãy chọn một loại giống:
                </p>
              </div>
              <div className="flex flex-row gap-2 px-2">
                <a
                  id="N"
                  onClick={handleClick}
                  className="px-4 py-2 text-lg text-darkGrayishBlue hover:text-green-400 cursor-pointer border-b border-gray-300 rounded-md transition-colors duration-300"
                >
                  Giống Lúa
                </a>
                <a
                  id="B"
                  onClick={handleClick}
                  className="px-4 py-2 text-lg text-darkGrayishBlue hover:text-green-400 cursor-pointer border-b border-gray-300 rounded-md transition-colors duration-300"
                >
                  Giống Ngô
                </a>
                <a
                  id="D"
                  onClick={handleClick}
                  className="px-4 py-2 text-lg text-darkGrayishBlue hover:text-green-400 cursor-pointer border-b border-gray-300 rounded-md transition-colors duration-300"
                >
                  Giống Dưa thơm
                </a>
                <a
                  id="L"
                  onClick={handleClick}
                  className="px-4 py-2 text-lg text-darkGrayishBlue hover:text-green-400 cursor-pointer border-b border-gray-300 rounded-md transition-colors duration-300"
                >
                  Giống Lan
                </a>
                <a
                  id="DN"
                  onClick={handleClick}
                  className="px-4 py-2 text-lg text-darkGrayishBlue hover:text-green-400 cursor-pointer border-b border-gray-300 rounded-md transition-colors duration-300"
                >
                  Giống Đậu nành
                </a>
              </div>
            </div>
          )}
        </li>
      </ul>

      {/* Search bar */}
      <div
        className="flex flex-grow justify-center mt-4 "
        style={{ marginLeft: "-190px" }}
      >
        <div className="relative w-full max-w-xs">
          <input
            className="bg-gray-200 text-black px-4 py-2 pr-16 rounded-full focus:outline-none w-full"
            type="search"
            name="search"
            onChange={handleChange}
            onKeyDown={searchKeyDown}
            value={formData?.search || ""}
            placeholder="Tìm kiếm..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="absolute right-0 top-0 mt-2 mr-3 bg-green-700 text-white h-10 px-4 rounded-full transition-all duration-300 hover:bg-blue-500 flex items-center justify-center"
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              marginTop: "0px",
              marginRight: "0px",
            }}
            // Adjust button border radius
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <ul className="flex justify-center items-center gap-3">
        <li className="ml-3 text-xl  relative min-w-200  ">
          {isLoggedIn && currentData.power == false && (
            <div className="flex items-center  relative gap-1 z-50 mr-10">
              <button
                style={{
                  marginRight: "39px",
                  marginBottom: "-15px",
                }}
                onClick={() => setIsShowMenu((prev) => !prev)}

                // onClickOutSide ={()=> setIsShowMenu(false)}
              >
                <FaUser
                  className="inline-block mr-1 text-3xl"
                  style={{ color: isHovered ? "gray" : "white" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
               
              </button>
              {isShowMenu && (
                <div className="absolute top-full right-5 mt-5 w-48 bg-white rounded-lg border border-white-200 shadow-md overflow-hidden">
                  {menuManage.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                      activeClassName="bg-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <MdManageAccounts className="text-green-500" />
                        <span className="text-base font-medium">
                          {item.text}
                        </span>
                      </div>
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-300 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-2 ">
                      <AiOutlineLogout className="text-red-500" />
                      <span className="text-base font-medium">Đăng xuất</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )} 
          {!isLoggedIn &&  (
            <NavLink to="/sign-in" className="hover:text-green-500">
              <button className="mr-20 bg-transparent border border-white text-white py-2 px-4 rounded-full hover:bg-white hover:text-gray-800 hover:border-transparent transition duration-300">
                Đăng nhập
              </button>
            </NavLink>
          )}
          {/* {isLoggedIn && currentData.power == true && (
            <NavLink to="/admin/manage-species">
            <span className="flex items-center py-5 pl-3 pr-4 mr-20 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <FaUser/>
              Admin
            </span>
          </NavLink>
          )} */}
          {isLoggedIn && currentData.power == true && (
            <div className="flex items-center  relative gap-1 z-50 mr-10">
              <button
                style={{
                  marginRight: "39px",
                  marginBottom: "-15px",
                }}
                onClick={() => setIsShowMenu((prev) => !prev)}

                // onClickOutSide ={()=> setIsShowMenu(false)}
              >
                <FaUser
                  className="inline-block mr-1 text-3xl"
                  style={{ color: isHovered ? "gray" : "white" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
               
              </button>
              {isShowMenu && (
                <div className="absolute top-full right-5 mt-5 w-48 bg-white rounded-lg border border-white-200 shadow-md overflow-hidden">         
                    <NavLink                     
                      to="/admin/manage-species"
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                      activeClassName="bg-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <MdManageAccounts className="text-green-500" />
                        <span className="text-base font-medium">
                          Quản lý
                        </span>
                      </div>
                    </NavLink>
            
                  <button
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-gray-300 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-2 ">
                      <AiOutlineLogout className="text-red-500" />
                      <span className="text-base font-medium">Đăng xuất</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )} 
        </li>
      </ul>
      
      {isShowModal && (
        <ModalFilter
          idModal={idModal}
          isShowModal
          setIsShowModal={setIsShowModal}
        />
      )}
      <ToastContainer />
    </nav>
    
  );
}

export default Navbar;
