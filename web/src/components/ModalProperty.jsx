import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPropertyID } from "../../src/store/actions/properties";
import * as actions from "../store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root");
const ModalAddSpecies = ({ idModal, isShowModal, setIsShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertiesID } = useSelector((state) => state.properties);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
  };
  const [load, setLoad] = useState(false);

  console.log(propertiesID)
  useEffect(() => {
    dispatch(getPropertyID(idModal));
  }, [idModal]);

  return (
    <div
      className="absolute w-auto h-auto   bg-overlay-70 flex justify-center  "
      onClick={(e) => {
        e.stopPropagation();
        setIsShowModal(false);
      }}
    >
      <div
        className="bg-white max-w-1100 w-full overflow-y-auto justify-items-center pr-12"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isShowModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative top-0 w-auto mx-auto h-auto max-h-[calc(100vh-100px)]">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-between items-center w-full bg-white outline-none focus:outline-none p-10 gap-5">
                  <span className="uppercase text-blue-400 font-bold text-center text-xl">
                    Các giá trị thuộc tính của:  <span className="italic text-blue-700"> {propertiesID?.name_vn}</span>
                  </span>
                  <div className="gap-2 overflow-y-auto  max-h-100 text-center">
                    <table className="table-auto border border-solid  border-slate-600 p-4  ">
                      <thead>
                        <tr>
                          <th className="border p-4 text-gray-400">
                            Giá trị 
                           
                          </th>
                          <th className="border p-4 text-gray-400">
                            Mô tả giá trị  
                            
                          </th>
                          <th className="border p-4 text-gray-400">
                            Mô tả giá trị (Tiếng Anh)
                           
                          </th>
                          {/* <th className="border p-4 text-gray-400">
                            Quản lý
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        
                        {propertiesID &&
                          propertiesID?.PropertiesValues?.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td
                                  className="border p-4 text-center"
                               
                                >
                                  {item?.option}
                                </td>
                                <td
                                  className="border p-4 text-center"
                               
                                >
                                  {item?.description}
                                </td>
                                <td
                                  className="border p-4 text-center"
                               
                                >
                                 {item?.description_en} 
                                </td>
                                {/* <td className="  border ">
                                    <button
                                    className="text-gray-300 hover:text-red-600 p-3"
                                    //   onClick={() => handleDelete(item?.id)}
                                    >
                                    Xóa
                                    </button>
                                    <button
                                    className="text-gray-300 hover:text-green-600"
                                    //   onClick={() => {
                                    //     handleSave(item)
                                    //     setIsEditing(true)
                                    //     openModal()
                                    // }}
                                    >
                                        Sửa
                                    
                                    </button> 
                                </td>*/}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    <div className="flex justify-center gap-5 items-center pt-5">
                      <button
                        className="bg-gray-200 p-2 border rounded-sm"
                        onClick={() => setIsShowModal(false)}
                      >
                        Hủy
                      </button>
                      
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 ">
                    <button
                      className=" bg-transparent border border-black text-white"
                      onClick={() => setIsShowModal(false)}
                    >
                      <div className="bg-red-600 p-1 text-xl">
                        <MdClose />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ModalAddSpecies;
