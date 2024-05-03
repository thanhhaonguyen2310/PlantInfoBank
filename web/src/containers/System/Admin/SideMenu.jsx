import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    TableOutlined,
    OrderedListOutlined,
    PayCircleOutlined,
    AppstoreAddOutlined

  } from "@ant-design/icons";
import { MdAddComment ,MdAddLocationAlt,MdOutlinePlaylistAddCheck} from "react-icons/md";
import { AiOutlineCluster } from "react-icons/ai";
import { FaRegObjectUngroup } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";

  
  function SideMenu() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/admin");
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className="py-5 flex flex-col ">
        {/* <User/> */}
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
              label: "Danh sách người dùng",
              key: "/admin/manage-user",
              icon: <UserOutlined />,
            },
            {
              label: "Danh sách mẫu giống",
              icon: <OrderedListOutlined />,
              key: "/admin/manage-species",
            },
            {
              label: "Duyệt danh sách giống",
              icon: <MdOutlinePlaylistAddCheck />,
              key: "/admin/manage-listadd",
            },
            {
              label: "Danh sách giống đã xóa",
              icon: <FcDeleteDatabase />,
              key: "/admin/manage-listdelete",
            },
            {
              label: "Thêm vùng phân bố",
              key: "/admin/manage-addarea",
              icon: <MdAddLocationAlt />,
            },
            {
              label: "Thêm mẫu giống",
              icon: <MdAddComment />,
              key: "/admin/manage-add",
            },
            
            {
              label: "Thêm mẫu giống từ file excel",
              key: "/admin/manage-addspeciesexcel",
              icon: <AppstoreAddOutlined />,
            },
            {
              label: "HierarchicalClusteringDiagram",
              key: "/admin/manage-hierarchical",
              icon: <AiOutlineCluster />,
            },
            {
              label: "Kmeans",
              key: "/admin/manage-kmeans",
              icon: <FaRegObjectUngroup />,
            },
          ]}
        ></Menu>
      </div>
    );
  }
  export default SideMenu;
  