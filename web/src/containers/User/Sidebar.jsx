import {AppstoreOutlined,ShopOutlined,ShoppingCartOutlined,UserOutlined,OrderedListOutlined,AppstoreAddOutlined}  from "@ant-design/icons"
import { Menu } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
const anonAvatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEX///9mZmZfX1/Ly8tjY2P8/PxZWVn4+Pjh4eFpaWn19fXk5ORcXFyCgoJVVVXt7e2Ojo5zc3O+vr6jo6OxsbHR0dGUlJTY2Nhubm55eXnFxcVQUFC3t7dLS0uIiIiqqqq77L+vAAAGpUlEQVR4nO2d25ajKhCGIyIe8IznJPr+b7lNTLqTjp0oVgE92+9q1lzM+C+gThSVw2FnZ2dnZ2dnZ2dnRzduwr0LnAe6P2ULDi/zQlRpH13pKzHktufq/iwJAnuoosynYUjuhCG1mjYVeaL749ZRpq1v0RHrmctfUT/r8z+z5YKiIeRFx7Mkv+K6P3MJvGLsjZC7njCOakf3t77H4VXMPiqZIHFktDVIToulXOWcBTd1dYIyOn7eYE+wxlDTxgUl66SMUFLVuj/8FafsycplmQjb3LST4+TZ+mWZIL4wy+u4gy+1LFcoTU1S41RyW+xrcRqD1ERrDPKsGmqMmijeqMUcNU61XcuoJjPB4Thi6x67qen1q3FOm47+A1S/hS4bMDHWSXOg5kWyvnJGTVNq1RIIOC3aj429zVn+JBw0hmm8hVyYEeJp0+IOMFb5QUyrzaJ576oWchxzTVrcKoTWMiZrmk5NfQTXYlnxSY+YHn5hLsmNlqXhEPHlK0zLqUE4MRdoqyGocYFdzLcaDUFNB+1j7pBKvZgebWXUO84A3F9+ifE71WJyNDEWEarFVHhiaK94nzktophMcfnZA8uWZ8RYiv1mt6Ec+1nNoFbMgKhl9DRq4zPE86+8FuCmmGJopDR7TiJUMZnS8IzjimlslWJqRDdzsc1KA5oywxRj0X9JDFHqNbHFKK1q7GKWQ5Vus3/Kmnm4YtT6mQTwjmlGjNoIIOhRV6ZVm50hR81qex4Fbj6jtghwQtRiEaG2Qgt3Yz6H4muNBNFr0kypZR5BTGhopLrnGbGiob5yXiN6zUK1mAPaoaGN+maAAefi7HJklGs5cKzLJqrjvhm61eSuxdfRDWRjtAFYVqjhFvBwcHBq57GehzUnjEYAkmrRckgw4rOjrhdPHfypYZoWZlwa+OvzWF9jYw3dcMY0NtAGAjYMIJHOjlPITuCLv9TbC2xDWjRS6H3j5ALmNaTS/RogSKE2Gmn19QHfgaoG6G6en+Ag9pkS5b1Ms9RnADW6umZf8OKtamisPu//jdrfZgWo2quyD9Sb0k7S6Gqan8dL5c1A2Jpgxx5JhGTiSUml37/8JOgymaiT+IVuvz+Hw6u14wDGmD8qTXtzfiOwmwXjMx6lhCcTl+VGINjy2iA5V4mpUycmEhGHi1aHHBXfXEqRiOx1es4z18Ez5tmwWYIubXz6y6tHSonV9EaasN/w8irKLoOaHhZp/CMJSdOmhenjc15JypOo+rahE4Q2WZSKwvb+nJIbAa/tLp/o7NIz3Hr9O/ATrElK9Fm4Mm1oC3ll7/VNr7oF4PY/R+FoqCiBe4TQ+aPtI2rbs67wPr6lYwxokkdQTck3jRXLSQT7DvfJGaAQ6drkK6gjcarOfLt2+xxNxm25rafK5dVThYdZqqJpPpCfCT8hopZfHYcX/o9Ym7JUSTOgHc3kLDRsBtkYxSvamTg7zHL0reacrPnkmLJMSCSNTl1E4WxlhzKBvNUC8fsEEBpm1cr5mIEt2pc9+704KaoPTd6P/qLEj0S5eHfwIWreJj4kQjw4/OOF7CXrasWS08OLyP+Uw1kEryf4s5ZJDwmt9K1pTewqY29noH6pwbrn8FaMZCPxkbSi8wLXdb5x3YDbQ28dF5YJLv8QznQAvna8HGHx8cz8MSGbSKOMnY8xWzdEiDQIOy1J5frL6Jg731i0sV4I4V86u0Aj2WTUtNAlKYEzymQRDPhJfa5RyxjIgk47qC3UV1kfgbxYS1DfMS0Asg+lwnzGtAjSQgWdJ/jJX+vVVDAJAe7Lv4VQmNeOAdJMppWAdNY4iANmVsEAZoZ6SI3lq6Hbn6LDzzCUJtzc86jbXT6ytRvVBWuNA2Drk4dSa0z2E7YtRsOc+yPBccvS5DivSqQh7QYxi1N1VWx49qA3i5mD9LJaHNzZElJQ2YJAZ5BZvkMlH3E5qCOMJJF9xGkbZpcnqJyv0Z9fzkGlIjTcASYbkCluFIZqkZlJkZgUYj4iM8cF9JUPKGR1p70zGLowMoNcjN1lMhXB0kgnM8GKdRmnczIm9X9l7T5LzCiW/cLKaNOkOsYrrFu1z9AGmIMQrvKb0M98gVlXpsEcXgQBW2OcPdjfyAEnXlMO7IxL/p8h/fL+KcecAvM81F9uAVy0HzCAYsUIlMDgWGYiXt7+zA0rZL7ClndTl8aLWTGdBmU6Dii0WSzGbP9/5bxYTPoHxCz2miaWMn9wXhydGVvL+Oa8uErrh8R0louxzafT/quoOzs7Ozs7Ozs7/x/+A44keUR/tP76AAAAAElFTkSuQmCC'

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
            key: "/account/profile",
          },
          {
            label: "Danh sách mẫu đã thêm",
            key: "/account/listadd",
            icon: <OrderedListOutlined />,
          },
          {
            label: "Thêm mẫu giống",
            key: "/account/addspecies",
            icon: <AppstoreAddOutlined />,
          },
          {
            label: "Thêm mẫu giống từ file excel",
            key: "/account/addspeciesexcel",
            icon: <AppstoreAddOutlined />,
          },
          {
            label: "HierarchicalClusteringDiagram",
            key: "/account/hierarchical",
            icon: <AppstoreAddOutlined />,
          },
          {
            label: "Kmeans",
            key: "/account/kmeans",
            icon: <AppstoreAddOutlined />,
          },
          
        ]}
      ></Menu>
    </div>
    </div>
  )
}

export default Sidebar