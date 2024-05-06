import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllAddSpecies } from "../../../store/actions/species";
import { getAllGenus } from "../../../store/actions/genus";
import { getPropertiesGenus } from "../../../store/actions/properties";
import api from "../../../services/properties.services";
// import apis from "../../../services/properties.services";
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import ModalAddSpecies from "../../../components/ModalAddSpecies";
import Modal from "react-modal";

Modal.setAppElement("#root");
const ManageProperty = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  // console.log(id)
  const { propertygenus } = useSelector((state) => state.properties);
  const { genus } = useSelector((state) => state.genus);
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    // console.log(e.target.name)
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  console.log(propertygenus)
  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);
  const [idgenus, setIdGenus] = useState(1);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSave, setDataSave] = useState(null);
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
  };
  const handleCreate =async(event) => {
    event.preventDefault();
    console.log(formData)
    const respone = api.createProperty(formData)
    setLoad(!load)
    closeModal();
  };
  const handleDelete = async(id) => {
    console.log(id)
    const data = {id: id}
    const respone = await api.delete(data)
    setLoad(!load)
  };
  const handleEdit = async(event) => {
    event.preventDefault();
    const data ={
        id: idgenus,
        name_vn: nameVN,
        name_en: nameEN
    }
    const respone = await api.update(data)
    console.log("Tên tiếng Việt:", nameVN);
    console.log("Tên tiếng Anh:", idgenus);
    setNameVN('')
    setNameEN('')
    setLoad(!load)
    closeModal();
  };
  const handleClick = (item) => {
    // console.log(e.target.value)
    console.log(item)
  };
  const handleSave = (item) => {
    // console.log(e.target.value)
    console.log(item)
    setDataSave(item)
  };
  const handleChangeGenus = (e) => {
    // console.log(e.target.value)
    setIdGenus(e.target.value);
  };
  
  useEffect(() => {
    dispatch(getAllAddSpecies(-1));
    dispatch(getAllGenus());
    dispatch(getPropertiesGenus(idgenus));
  }, [load,idgenus]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-10 text-center text-blue-400 uppercase">
        Danh sách thuộc tính
      </h1>
      
      <div className="py-6 flex justify-between">
      <select
                  className="shadow-md py-2  bg-white-300  w-[120px] h-[35px] text-center text-[15px]"
                  onChange={handleChangeGenus}
                  value={genus}
                >
                  <option className="bg-white-500">
                    Chọn ở đây
                  </option>
                  {genus.map((item) => (                   
                    <option value={item?.id} className="bg-white-500" key={item?.id}>
                        {item?.name_vn}
                      </option>
                    
                  ))}
                </select>
                <div>
        <button 
             onClick={openModal}
            className=" bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded-md mt-4 focus:outline-none relative">
            Thêm mới
        </button>
      </div>
      </div>
      {propertygenus &&
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Mã thuộc tính</th>
            <th className="py-2 px-4 border">Tên thuộc tính</th>
            <th className="py-2 px-4 border">Tên thuộc tính (Tiếng Anh)</th>
            <th className="py-2 px-4 border">Thuộc loại</th>
            <th className="py-2 px-4 border">Các giá trị</th>
            <th className="py-2 px-4 border">Quản lý</th>
       
          </tr>
        </thead>
        <tbody>
        {propertygenus?.rows?.map((item) => (       
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.id}</td>
              <td className="py-2 px-4 border">{item?.name_vn}</td>
              <td className="py-2 px-4 border">{item?.name_en}</td>
              <td className="py-2 px-4 border">{item?.Genus?.name_vn}</td>
              <td className="py-4 px-4 border flex items-center justify-center hover:shadow-lg cursor-pointer text-xl"
                    // id={item.id}
                    onClick={() => handleClick(item?.PropertiesValues)}
              >
                <GiThreeLeaves className="text-gray-400 hover:text-green-500 hover:shadow-lg" />
              </td>
              <td className="  border ">
                <button
                  className="text-gray-300 hover:text-red-600 p-3"
                  onClick={() => handleDelete(item?.id)}
                >
                  Xóa
                </button>
                <button
                  className="text-gray-300 hover:text-green-600"
                  onClick={() => {
                    handleSave(item)
                    setIsEditing(true)
                    openModal()
                }}
                >
                    Sửa
                  
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        }
        <div className="flex justify-center items-center h-screen">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal items-center"
      >
        <div className="flex justify-center items-center m-5 p-10">
        <div className="bg-gray-300 rounded-lg p-3 ">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4 text-center">{isEditing ? "Cập nhật loại giống" : "Thêm loại giống mới"} </h2>
          <form 
            onSubmit={isEditing ? handleEdit : handleCreate}
        >
            <div className=" mb-4 mt-5 flex justify-between gap-5">
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[40%]">Mã thuộc tính:</label>
              <input
                type="text"
                value={isEditing && dataSave?.id}
                name="id"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className=" mb-4 mt-5 flex justify-between gap-5">
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[40%]">Tên thuộc tính:</label>
              <input
                type="text"
                value={isEditing && dataSave?.name_vn}
                name="name_vn"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 flex justify-between gap-5">
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[40%]">Tên thuộc tính (Tiếng Anh):</label>
              <input
                type="text"
                value={isEditing && dataSave?.name_en}
                name="name_en"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              
            </div>
            <div className="mb-6 flex justify-between gap-5">
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[150%]">Chọn loại giống:</label>
              {/* <input
                type="text"
                // value={nameEN}
                name="name_en"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              /> */}
                <select
                    className="shadow-md py-2  bg-white-300  w-[120px] h-[35px] text-center text-[15px]"
                    onChange={handleChange}
                    value={isEditing && dataSave?.Genus?.name_vn}
                    name="genusId"
                  >
                  <option className="bg-white-500">
                    Chọn ở đây
                  </option>
                  {genus.map((item) => (                   
                    <option value={item?.id} className="bg-white-500" key={item?.id}>
                        {item?.name_vn}
                      </option>
                    
                  ))}
                </select>

              
            </div>
            
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col justify-center items-center text-center mx-auto">
               Thực hiện
            </button>
          </form>
        </div>
        <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition-colors duration-300"
            >
              Close Modal
            </button>
        </div>
        
      </Modal>
      </div>
    
      {/* <ReactPaginate
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
          /> */}
    </div>
  );
};

export default ManageProperty;
