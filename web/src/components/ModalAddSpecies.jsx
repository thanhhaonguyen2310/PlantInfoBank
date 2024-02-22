import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperty } from "../../src/store/actions/species";
import * as actions from "../store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

const ModalAddSpecies = ({ idModal, isShowModal, setIsShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailspecies } = useSelector((state) => state.species);
  console.log(detailspecies)
  useEffect(() => {
    dispatch(getProperty(idModal));
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
              <div className="relative w-auto mx-auto max-w-6xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-between items-center w-full bg-white outline-none focus:outline-none p-10 gap-5">
                  <span className="uppercase text-red-500 text-center text-xl">
                    Chi tiết về giống
                  </span>
                  <div className="gap-2">
                    <table className="table-auto border border-solid  border-slate-600 p-2">
                      <thead>
                        <tr>
                          <th className="border p-2 text-gray-400">
                            Mẫu giống :{" "}
                            <span>{detailspecies[0]?.Species?.name}</span>
                          </th>
                          <th className="border p-2 text-gray-400">
                            Tên trước kia :{" "}
                            <span>{detailspecies[0]?.Species?.name_other}</span>
                          </th>
                          <th className="border p-2 text-gray-400">
                            Nơi thu giống :{" "}
                            <span>{detailspecies[0]?.Species?.origin_vn}</span>
                          </th>
                          <th className="border p-2 text-gray-400">
                            Xuất xứ: <span>chưa biết</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            className="border p-2 text-center text-xl text-brown-200 font-bold "
                            colSpan="4"
                          >
                            Đặc tính cụ thể của mẫu giống{" "}
                          </td>
                        </tr>
                        {detailspecies?.length > 0 &&
                          detailspecies?.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td
                                  className="border p-2 text-left"
                                  colSpan="2"
                                >
                                  {item?.Properties?.name_vn}
                                </td>
                                <td
                                  className="border p-2 text-left"
                                  colSpan="2"
                                >
                                  {item?.PropertiesValue
                                    ? item.PropertiesValue.description
                                    : item.value}
                                </td>
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
