import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../../store/actions/properties";
import { getCurrent } from "../../store/actions/user";
import api from "../../services/properties.services";
import * as actions from "../../store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSpecies = () => {
  const dispatch = useDispatch();
  const [genus, setGenus] = useState("0");
  const { properties } = useSelector((state) => state.properties);
  const { currentData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrent());
    dispatch(getProperties(genus));
  }, [genus]);

  const handleChangeGenus = (e) => {
    setGenus(e.target.value);
  };

  const [data, setdata] = useState({});

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setdata({ ...data, ["id"]: genus });
    const response = await api.addSpecies(currentData?.id, data);
    setdata({});
    setGenus("0");
    response?.err === 0
      ? toast.success("Đã thêm mẫu giống !", {
        position: "top-right",
      })
      : toast.error("Đã xảy ra lỗi. Vui lòng kiểm tra lại !", {
        position: "top-right",
      });
  };

  return (
    <div className="w-full bg-white">
      <header className="py-4 bg-green-600 text-white text-center">
        <h1 className="text-3xl font-semibold">Thêm mẫu giống</h1>
        <p className="text-lg font-semibold text-blue-200"></p>
      </header>
      <div className="pr-20 flex flex-col mt-10">

        <div className="flex justify-center gap-20">
          <span className="text-3xl text-blue-600 font-semibold">
        Bạn muốn thêm mẫu giống nào?
      </span>
          <div>
            <select
              className="shadow-md py-2 bg-white-300 w-[170px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleChangeGenus}
              value={genus}
            >
              <option value="0" className="bg-white-500">
                Chọn ở đây
              </option>
              <option value="N" className="bg-white-500">
                Lúa
              </option>
              <option value="B" className="bg-white-500">
                Ngô
              </option>
              <option value="D" className="bg-white-500">
                Dưa lưới
              </option>
              <option value="DN" className="bg-white-500">
                Đậu nành
              </option>
            </select>
          </div>
        </div>


        <div>
          {genus !== "0" && (
            <div className="gap-2 mt-10">
              <div className="flex flex-col py-2 bg-gray-100 rounded-lg shadow-md">
                <div className="flex gap-5 text-center m-5">
                  <div className="flex flex-col">
                    <label className="text-blue-600 font-semibold mb-1">Tên giống</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-blue-600 font-semibold mb-1">Tên gọi khác</label>
                    <input
                      type="text"
                      name="name_other"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-blue-600 font-semibold mb-1">Xuất xứ</label>
                    <input
                      type="text"
                      name="origin_vn"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-blue-600 font-semibold mb-1">Xuất xứ (Tiếng Anh)</label>
                    <input
                      type="text"
                      name="origin_en"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>


                {properties?.rows?.length > 0 &&
                  properties?.rows.map((item) => {
                    return (
                      <div className="flex justify-between items-center px-20 py-2" key={item.id}>
                        <label className="ml-10 w-[50%] pl-2 font-semibold text-gray-800 bg-white border border-gray-300 rounded-md p-2 shadow-md">
                          {item?.name_vn}
                        </label>

                        {item.PropertiesValues.length > 0 ? (
                          <select
                            className="mr-20 shadow-md py-2 bg-white border border-gray-300 rounded-md p-2 w-[170px] focus:outline-none focus:border-blue-500"
                            name={item?.id}
                            onChange={handleChange}
                          >
                            <option value="-1" className="bg-white"></option>
                            {item?.PropertiesValues.map((propertiesvalue) => {
                              return (
                                <option
                                  className="bg-white "
                                  key={propertiesvalue?.id}
                                  value={propertiesvalue?.option}
                                >
                                  {propertiesvalue.description}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <div>
                            <input
                              type="number"
                              name={item?.id}
                              onChange={handleChange}
                              className="mr-20 shadow-md py-2 bg-white border border-gray-300 rounded-md p-2 w-[170px] focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}


                <div className="flex justify-center gap-5 items-center pt-5">
                <button
  onClick={handleSubmit}
  className="bg-green-600 text-white py-2 px-4 rounded-md border border-green-600 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors duration-300"
>
  Thêm
</button>

                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />

      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSpecies;
