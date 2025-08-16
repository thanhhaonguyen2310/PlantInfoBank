import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecies,getAllSpecies } from "../../../store/actions/species";
import api from "../../../services/species.services";
// import {getAllSpecies} from "../../store/actions/species"
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import ModalAddSpecies from "../../../components/ModalAddSpecies";
import ReactPaginate from "react-paginate";

const ManageSpecies = () => {
  const dispatch = useDispatch();
  const {species} = useSelector(state => state.species)
  const [genus, setGenus] = useState(1);
  const [page, setPage] = useState(0);
  const handleChangeGenus = (e) => {
    // console.log(e.target.value)
    setGenus(e.target.value);
  };
  const handlePageClick = async (data) => {
    console.log(data.selected);
    setPage(data.selected)
  };
  console.log(species)
  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);
  const handleClick = (id) => {
    console.log(id)
    setIdModal(id)
    setIsShowModal(true)
   
  };

  useEffect(() => {
    dispatch(getSpecies( parseInt(genus, 10),page))
  }, [isShowModal,genus,page]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-10 text-center text-blue-400 uppercase">
        Danh sách mẫu giống
      </h1>
      <div className="py-6">
      <select
                  className="shadow-md py-2  bg-white-300  w-[120px] h-[35px] text-center text-[15px]"
                  onChange={handleChangeGenus}
                  value={genus}
                >
                  <option value="0" className="bg-white-500">
                    Chọn ở đây
                  </option>
                  <option value="1" className="bg-white-500">
                    Lúa
                  </option>
                  <option value="2" className="bg-white-500">
                    Ngô
                  </option>
                  <option value="3" className="bg-white-500">
                    Dưa lưới
                  </option>
                  <option value="4" className="bg-white-500">
                    Lan
                  </option>
                  <option value="5" className="bg-white-500">
                    Đậu nành
                  </option>
                </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Tên giống</th>
            <th className="py-2 px-4 border">Tên gọi khác</th>
            <th className="py-2 px-4 border">Xuất xứ</th>
            <th className="py-2 px-4 border">Chi tiết</th>
       
          </tr>
        </thead>
        <tbody>
          {species?.rows?.length>0 && species?.rows.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.name}</td>
              <td className="py-2 px-4 border">{item?.name_other}</td>
              <td className="py-2 px-4 border">{item?.origin_vn}</td>
              <td className="py-3 px-4 border flex items-center justify-center hover:shadow-lg cursor-pointer text-xl"
                    // id={item.id}
                    onClick={() => handleClick(item.name)}
              >
                <GiThreeLeaves className="text-gray-400 hover:text-green-500 hover:shadow-lg" />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {isShowModal && <ModalAddSpecies idModal={idModal} isShowModal  setIsShowModal={setIsShowModal} />}
      {/* <ToastContainer /> */}
      <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(species.count/12)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"flex items-center justify-center  gap-2 border-t border-gray-200 bg-white px-4 py-3 sm:px-6 "}
            pageClassName={"isolate inline-flex -space-x-px rounded-md shadow-sm"}
            pageLinkClassName={"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
            previousClassName={"relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}
            // previousLinkClassName={"page-link"}
            nextClassName={"relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}
            // nextLinkClassName={"page-link"}
            // breakClassName={"page-item"}
            // breakLinkClassName={"page-link"}
            activeClassName={"relative z-10 inline-flex items-center bg-green-500  text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"}
          />
    </div>
  );
};

export default ManageSpecies;
