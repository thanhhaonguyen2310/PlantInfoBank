import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { useLocation,  useNavigate } from 'react-router-dom';
import * as actions from '../../src/store/actions/auth'
import api from "../../src/services/species.services";
import {getCurrent} from '../../src/store/actions/user';
import menuManage from '../../src/ultils/menuManege';
import { AiOutlinePlusCircle, AiOutlineLogout } from 'react-icons/ai'
import { CiSearch } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import { FaUserAlt ,FaSearch} from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalFilter from "./ModalFilter";

function Navbar() {
  const [showDataDropdown, setShowDataDropdown] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);


  const { isLoggedIn } = useSelector(state => state.auth)
  const {currentData} = useSelector(state => state.user)
  const { detailspecies } = useSelector((state) => state.species);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  console.log(isLoggedIn)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(actions.getId(formData))
    
    const respone = await api.getIdSpecies(formData?.search);
    console.log(respone.msg)

    respone.msg === 'OK' ? navigate(`/detailgen/${formData?.search}`) 
                  :toast.error('Không tìm thấy mẫu giống này!', {
                      position: "top-right"
                  }) 
    setFormData({}) 
    
  }
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
    setIdModal(showId)
    setIsShowModal(true)
    // console.log('ID của thẻ <li> được click:', showId);
  };
  useEffect(() => {
    dispatch(getCurrent())
  }, []);

  return (
    <nav className="w-[90%] md:w-[80%] px-[10px] md:py-[20px] mx-auto   flex justify-between items-center gap-10 relative">
      <div className=" flex justify-center items-center space-x-2 gap-8 w-[50%] relative">
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
              Giống cây
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
                  to="/genus/5"
                  className="text-base text-darkGrayishBlue hover:text-green-400"
                >
                  Giống đậu nành
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
            onChange={handleChange}
            onKeyDown={searchKeyDown}
            value={formData?.search ||''}
            placeholder="Tìm kiếm..."
            className="bg-white h-10 px-5   text-sm focus:outline-none"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="absolute right-0 top-0 mt-2  transition-colors duration-300 hover:bg-green-509"
          >
            <FaSearch/>
          </button>
        </div>
        <li
            className="  relative group"
            onMouseEnter={handleFilterHover}
            onMouseLeave={handleFilterLeave}
          >
            <span
            
              className="text-darkGrayishBlue transition-all hover:border-t-4 border-green-700 hover:pt-[13px] hover:text-black"
            >
              Bộ Lọc
            </span>
            {showfilter && (
              <div className="  absolute bg-white shadow-lg rounded-md overflow-hidden z-50 space-x-4 mr-5 cursor-pointer">
                  <span className="flex text-center justify-center text-red-300 p-2">Hãy chọn một loại giống phía dưới</span>
                  <div className="   mt-2  flex space-x-4 pb-5 px-5 h-auto w-[300px]">
                    <a
                      id="N"
                      onClick={handleClick}
                      className="text-base text-darkGrayishBlue hover:text-green-400"
                    >
                      Giống lúa
                    </a>
                    <a
                      id="B"
                      onClick={handleClick}
                      className="text-base text-darkGrayishBlue hover:text-green-400"
                    >
                      Giống ngô
                    </a>
                    <a
                      id="D"
                      onClick={handleClick}
                      className="text-base text-darkGrayishBlue hover:text-green-400"
                    >
                      Giống dưa thơm
                    </a>
            
                    <a
                      id="DN"
                      onClick={handleClick}
                      className="text-base text-darkGrayishBlue hover:text-green-400"
                    >
                      Giống đậu nành
                    </a>
                    
                  </div>
              </div>
              
            )}
          </li>
        <li className="ml-3 text-xl  relative min-w-200  ">
          {isLoggedIn ? 
            <div className='flex items-center  relative gap-1 z-50'>
            
            <button             
                onClick={()=> setIsShowMenu(prev => !prev)}
                
                // onClickOutSide ={()=> setIsShowMenu(false)}
               
            ><FaUserAlt className="hover:text-green-500"/></button>
            {isShowMenu &&
                <div className='absolute flex flex-col gap-2  top-full right-0 bg-white p-4 shadow-md rounded-md  cursor-pointer  w-[200px]'>
                {menuManage.map(item => {
                    return (
                        <NavLink key={item.id}
                                to={item?.path}
                               className='hover:text-red-600 flex items-center gap-2'
                        >
                            <MdManageAccounts/>
                            {item?.text}
                            
                        </NavLink>
                    )
                })}
                <span 
                    onClick={()=> {
                        setIsShowMenu(false)
                        dispatch(actions.logout())
                    }} 
                    className='cursor-pointer hover:text-red-600 flex items-center gap-2'>
                        <AiOutlineLogout/>
                        Đăng xuất</span>
                 </div>
            }
           
        </div>

            :
          <NavLink to="/sign-in" className="hover:text-green-500">Đăng nhập</NavLink> }
        </li>
        {isLoggedIn && currentData.power == true &&
              <li>
                <NavLink to={'/admin/manage-statistics'}>
                  <span  className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Quản Lý </span>
              </NavLink>
              
              </li>
            }
      </ul>
      {isShowModal && <ModalFilter idModal={idModal} isShowModal  setIsShowModal={setIsShowModal} />}
      <ToastContainer />
    </nav>
  );
}

export default Navbar;
