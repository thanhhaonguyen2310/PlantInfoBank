import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllAddSpecies } from "../../../store/actions/species";
import { getAllGenus } from "../../../store/actions/genus";
import { getPropertiesGenus,getPropertyID } from "../../../store/actions/properties";
import api from "../../../services/propertiesvalue.services";
// import apis from "../../../services/properties.services";
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import ModalProperty from "../../../components/ModalProperty";
import Modal from "react-modal";

Modal.setAppElement("#root");
const ManagePropertyValue = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  // console.log(id)
  const { propertygenus,propertiesID } = useSelector((state) => state.properties);
  const { genus } = useSelector((state) => state.genus);
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    // console.log(e.target.name)
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  console.log(propertiesID)
  const [isShowModal, setIsShowModal] = useState(false);
  const [idModal, setIdModal] = useState(null);
  const [idgenus, setIdGenus] = useState(null);
  const [idproperty, setIdProperty] = useState(null);
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
    const data = {...formData, id: idproperty}
    console.log(data)
    const respone = api.create(data)
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
    console.log(dataSave)
    const data = {...formData, id: dataSave?.id}
    const respone = await api.update(data)
    setLoad(!load)
    closeModal();
  };
  const handleClick = (id) => {
    console.log(id)
    setIdModal(id)
    setIsShowModal(true)
   
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
  const handleChangeProperty= (e) => {
    // console.log(e.target.value)
    setIdProperty(e.target.value);
  };
  
  useEffect(() => {
    // dispatch(getAllAddSpecies(-1));
    dispatch(getAllGenus());
    idgenus && dispatch(getPropertiesGenus(idgenus));
    idproperty && dispatch(getPropertyID(idproperty));
  }, [load,idgenus,idproperty]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-10 text-center text-blue-400 uppercase">
        Danh sách giá trị các thuộc tính
      </h1>
      
      <div className="">
        <div className="flex flex-col  gap-3 p-1 justify-center text-center items-center  mr-auto">
                <div className="flex gap-1 p-1 text-center items-center">
                        <label htmlFor="" className="text-md  text-red-600  ">
                        Chọn loại giống:
                        </label>            
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
                </div>
                {propertygenus &&
                    <div className="flex gap-1 p-1 text-center items-center">
                            <label htmlFor="" className="text-md  text-red-600  ">
                            Chọn thuộc tính:
                            </label>            
                            <select
                            className="shadow-md py-2  bg-white-300  w-[120px] h-[35px] text-center text-[15px]"
                            onChange={handleChangeProperty}
                            value={genus}
                            >
                            <option className="bg-white-500">
                                Chọn ở đây
                            </option>
                            {propertygenus?.rows?.map((item) => (                   
                                <option value={item?.id} className="bg-white-500" key={item?.id}>
                                    {item?.name_vn}
                                </option>
                                
                            ))}
                            </select>
                    </div>
                }
        </div>
             
    <div>
        {propertiesID && idproperty &&
        <button 
             onClick={openModal}
            className=" bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded-md mt-4 focus:outline-none relative">
            Thêm mới
        </button>}
      </div>
      </div>
      {propertiesID && idproperty &&
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Giá trị</th>
            <th className="py-2 px-4 border">Mô tả giá trị</th>
            <th className="py-2 px-4 border">Mô tả giá trị (Tiếng Anh)</th>
            <th className="py-2 px-4 border">Quản lý</th>
       
          </tr>
        </thead>
        <tbody>
        {propertiesID?.PropertiesValues?.map((item) => (       
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.option}</td>
              <td className="py-2 px-4 border">{item?.description}</td>
              <td className="py-2 px-4 border">{item?.description_en}</td>
              
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
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[40%]">Giá trị:</label>
              <input
                type="text"
                // value={isEditing ? dataSave?.id : ''}
                name="option"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            
            <div className=" mb-4 mt-5 flex justify-between gap-5">
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[40%]">Mô tả giá trị:</label>
              <input
                type="text"
                // value={isEditing ? dataSave?.name_vn : ''}
                name="description"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 flex justify-between gap-5">
              <label className="block text-gray-700 text-sm font-bold mb-2 w-[40%]">Mô tả giá trị (Tiếng Anh):</label>
              <input
                type="text"
                // value={isEditing ? dataSave?.name_en: null}
                name="description_en"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              
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
    
      
    </div>
  );
};

export default ManagePropertyValue;
