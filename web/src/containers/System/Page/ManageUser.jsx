import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUser } from "../../../store/actions/user";
import api from "../../../services/species.services";
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import ModalAddSpecies from "../../../components/ModalAddSpecies";

const ManageUser = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  // console.log(id)
  const { alluser } = useSelector((state) => state.user);

  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);
  const handleClick = (id) => {
    console.log(id);
    setIdModal(id);
    setIsShowModal(true);
  };
  const handleApprove = async (id) => {
    console.log(id);
    const respone = await api.setApprove(id);
    console.log(respone);
  };
  console.log(alluser);
  useEffect(() => {
    dispatch(getAllUser());
  }, [isShowModal]);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-10 text-center text-blue-400">
        Danh sách giống đang chờ duyệt
      </h1>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Họ tên</th>
            <th className="py-2 px-4 border">Số điện thoại</th>
            <th className="py-2 px-4 border">Địa chỉ</th>
            <th className="py-2 px-4 border">Giới tính</th>
            <th className="py-2 px-4 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {alluser.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.name}</td>
              <td className="py-2 px-4 border">{item?.phone}</td>
              <td className="py-2 px-4 border">{item?.address}</td>
              <td className="py-3 px-4 border flex items-center justify-center hover:shadow-lg cursor-pointer text-xl"
                    // id={item.id}
                    onClick={() => handleClick(item.name)}
              >
                <GiThreeLeaves className="text-gray-400 hover:text-green-500 hover:shadow-lg" />
              </td>
              <td className="  border ">
                <button
                  className="text-gray-300 hover:text-red-600 p-3"
                  
                >
                  <ImCancelCircle/>
                </button>
                <button
                  className="text-gray-300 hover:text-green-600"
                  onClick={() => handleApprove(item.id)}
                >
                    <FaCheckCircle/>
                  
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowModal && <ModalAddSpecies idModal={idModal} isShowModal  setIsShowModal={setIsShowModal} />}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ManageUser;
