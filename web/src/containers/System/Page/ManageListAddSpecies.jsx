import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllAddSpecies } from "../../../store/actions/species";
import api from "../../../services/species.services";
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import ModalAddSpecies from "../../../components/ModalAddSpecies";

const ManageListAddSpecies = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  // console.log(id)
  const { listAddspecies } = useSelector((state) => state.species);


  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);
  const handleClick = (id) => {
    console.log(id)
    setIdModal(id)
    setIsShowModal(true)
   
  };
  const handleApprove = async(id) => {
    console.log(id)
    const respone = await api.setApprove(id)
    console.log(respone)
  };
  console.log(listAddspecies);
  useEffect(() => {
    dispatch(getAllAddSpecies());
  }, [isShowModal]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-10 text-center text-blue-400">
        Danh sách giống đang chờ duyệt
      </h1>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Tên giống</th>
            <th className="py-2 px-4 border">Tên gọi khác</th>
            <th className="py-2 px-4 border">Xuất xứ</th>
            <th className="py-2 px-4 border">Chi tiết</th>
            <th className="py-2 px-4 border">Duyệt</th>
          </tr>
        </thead>
        <tbody>
          {listAddspecies.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.Species?.name}</td>
              <td className="py-2 px-4 border">{item?.Species?.name_other}</td>
              <td className="py-2 px-4 border">{item?.Species?.origin_vn}</td>
              <td className="py-3 px-4 border flex items-center justify-center hover:shadow-lg cursor-pointer text-xl"
                    // id={item.id}
                    onClick={() => handleClick(item.Species?.name)}
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
                  onClick={() => handleApprove(item.Species?.id)}
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

export default ManageListAddSpecies;
