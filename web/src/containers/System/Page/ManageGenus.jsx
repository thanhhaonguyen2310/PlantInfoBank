import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllGenus } from "../../../store/actions/genus";
import api from "../../../services/genus";
import { useDispatch, useSelector } from "react-redux";

import { GiThreeLeaves } from "react-icons/gi";
import { ImCancelCircle } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import ModalAddSpecies from "../../../components/ModalAddSpecies";

import Modal from "react-modal";

Modal.setAppElement("#root");

const ManageGenus = () => {
  const dispatch = useDispatch();
  const { genus } = useSelector((state) => state.genus);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nameVN, setNameVN] = useState('');
  const [nameEN, setNameEN] = useState('');
  const [idgenus, setId] = useState(null);
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
  };

  const [load, setLoad] = useState(false);
  const handleCreate =async(event) => {
    event.preventDefault();
    console.log("Tên tiếng Việt:", nameVN);
    console.log("Tên tiếng Anh:", nameEN);
    const data = {
        name_vn: nameVN ,
        name_en: nameEN
    }
    const respone = await api.createGenus(data)
    console.log(respone)
    setNameVN('')
    setNameEN('')
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

  console.log(genus);
  useEffect(() => {
    dispatch(getAllGenus());
  }, [load]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-10 text-center text-blue-400 uppercase">
        Danh sách các loại giống
      </h1>
      <div>
        <button 
             onClick={openModal}
            className=" bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded-md mt-4 focus:outline-none relative">
            Thêm mới
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Tên tiếng Việt</th>
            <th className="py-2 px-4 border">Tên tiếng Anh</th>
            <th className="py-2 px-4 border">Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {genus.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item?.name_vn}</td>
              <td className="py-2 px-4 border">{item?.name_en}</td>
              
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
                    setId(item?.id)
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
      <div className="flex justify-center items-center h-screen">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal items-center"
      >
        <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-3 min-w-20">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4 mt-10">{isEditing ? "Cập nhật loại giống" : "Thêm loại giống mới"} </h2>
          <form 
            onSubmit={isEditing ? handleEdit : handleCreate}
        >
            <div className=" mb-4 mt-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tên tiếng Việt:</label>
              <input
                type="text"
                value={nameVN}
                onChange={(e) => setNameVN(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tên tiếng Anh:</label>
              <input
                type="text"
                value={nameEN}
                onChange={(e) => setNameEN(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col justify-center items-center text-center mx-auto">
            {isEditing ? "Sửa" : "Thêm"}
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

export default ManageGenus;
