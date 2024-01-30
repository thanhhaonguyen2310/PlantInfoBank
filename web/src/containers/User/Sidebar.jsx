import {AppstoreOutlined,ShopOutlined,ShoppingCartOutlined,UserOutlined,}  from "@ant-design/icons"
import { Menu } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
const anonAvatar = 'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png'

const Sidebar = () => {
  const {currentData} = useSelector(state => state.user)
  // console.log(currentData)
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/he-thong");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);  
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className='w-[256px] flex-none p-4'> 
      <div>
        <div className='flex items-center gap-4'>
          <div>
              <img className='w-10 h-10 object-cover' src={anonAvatar} alt="avatar" />
              <button type="" className="hover:text-red-50" 
                // onClick={ha}
              >thay đổi</button>
          </div>
          
          <div className='flex flex-col justify-center'>
            <span className='font-semibold'>{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
        
      </span>
      </div>
      

      <div className="py-5 flex flex-col ">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Thông tin tài khoản",
            icon: <AppstoreOutlined />,
            key: "/user/profile",
          },
          {
            label: "Thêm mẫu giống",
            key: "/user/add",
            icon: <ShopOutlined />,
          },
          
          
        ]}
      ></Menu>
    </div>
    </div>
  )
}

export default Sidebar