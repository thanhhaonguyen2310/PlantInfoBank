import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAddSpecies } from "../../store/actions/species";
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import ModalAddSpecies from "../../components/ModalAddSpecies";

const ListAddSpecies = () => {
  
  const dispatch = useDispatch();
  const {currentData} = useSelector(state => state.user)
  // console.log(id)
  const { listAddspecies } = useSelector((state) => state.species);
  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);
  const handleClick = (id) => {
    console.log(id)
    setIdModal(id)
    setIsShowModal(true)
   
  };
  console.log(listAddspecies)
  useEffect(() => {
    dispatch(getAddSpecies(currentData?.id));
  }, [currentData?.id]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">
        Danh sách giống đã thêm
      </h1>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Tên giống</th>
            <th className="py-2 px-4 border">Tên gọi khác</th>
            <th className="py-2 px-4 border">Xuất xứ</th>
            <th className="py-2 px-4 border">Chi tiết</th>
            <th className="py-2 px-4 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {listAddspecies.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.Species?.name}</td>
              <td className="py-2 px-4 border">{item?.Species?.name_other}</td>
              <td className="py-2 px-4 border">{item?.Species?.origin_vn}</td>
              <td onClick={() => handleClick(item.Species?.name)}
              className="py-3 px-4 border flex items-center justify-center hover:shadow-lg cursor-pointer text-xl"><GiThreeLeaves className="text-gray-400 hover:text-green-500 hover:shadow-lg"/></td>
              <td className="py-2 px-4 border">
                <span
                  className={`${
                    item?.Species?.approve === false
                      ? "text-yellow-500"
                      : "text-green-500"
                  } font-semibold`}
                >
                  {item?.Species?.approve ? 'Đã duyệt' : 'Đang chờ duyệt'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShowModal && <ModalAddSpecies idModal={idModal} isShowModal  setIsShowModal={setIsShowModal} />}
    </div>
  );
};

export default ListAddSpecies;
