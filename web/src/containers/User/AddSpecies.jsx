import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../../store/actions/properties";
import {getCurrent} from '../../store/actions/user';
import api from "../../services/properties.services";
import * as actions from "../../store/actions/species"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSpecies = () => {
  const dispatch = useDispatch();
  const [genus, setGenus] = useState("0");
  const {properties }=  useSelector(state  =>  state.properties)
  const {currentData} = useSelector(state => state.user)
  console.log(currentData)
  const handleChangeGenus = (e) => {
    // console.log(e.target.value)
    setGenus(e.target.value)
  }
  const [data, setdata] = useState({});
  // console.log(data)
    const handleChange = (e) => {
      // console.log(e.target.name)
      setdata({...data, [e.target.name]: e.target.value})
    }
    const handleSubmit = async() =>{
      // dispatch(actions.saveSpecies(data))
      setdata({...data, ['id']: genus})
      const response = await api.addSpecies(currentData?.id,data)
      console.log(response)
      setdata({})
      setGenus("0")
      response?.err === 0 ?  toast.success('Đã thêm mẫu giống !', {
        position: "top-right"
                }) : toast.error('Đã xảy ra lỗi. Vui lòng kiểm tra lại !', {
                    position: "top-right"
                }) 
      
    }
      
  
  useEffect(() => {
    dispatch(getCurrent())
    dispatch(getProperties(genus));
  }, [genus]);
  return (
    <div className="w-full bg-white mt-10 ">
      <div className=" pl-10  flex flex-col">
        <div className="flex justify-center  gap-20">
          <span className="text-3xl text-slate-500">
            Bạn muốn thêm mẫu giống nào?
          </span>
          <div>
            <select
              className="shadow-md py-2  bg-white-300  w-[170px] "
              onChange={handleChangeGenus}
              value={genus}
            > 
                <option value="0" className="bg-white-500">Chọn ở đây</option>
                <option value="N" className="bg-white-500">Lúa</option>
                <option value="B" className="bg-white-500">Ngô</option>
                <option value="D" className="bg-white-500">Dưa lưới</option>
                <option value="DN" className="bg-white-500">Đậu nành</option>
           
            </select>
          </div>
        </div>

        <div>
        {genus != "0" &&
        <div className="gap-2  mt-10">
            <div className="flex flex-col   py-2 bg-gray-100 ">
                <div className="flex gap-5  text-center  m-5">
                    <div className="flex flex-col font-bold text-slate-500 bg-white-300! border-solid shadow-md p-4 ">
                        <label  >
                             Tên giống
                        </label>
                        <input type="text" name="name"
                                onChange={handleChange} />
                    </div>
                    <div className="flex flex-col font-bold text-slate-500 bg-white-300! border-solid shadow-md p-4">
                        <label  >
                             Tên gọi khác
                        </label>
                        <input type="text" name="name_other"
                                onChange={handleChange} />
                    </div>
                    <div className="flex flex-col font-bold text-slate-500 bg-white-300! border-solid shadow-md p-4">
                        <label  >
                             Xuất xứ
                        </label>
                        <input type="text" name="origin_vn"
                                onChange={handleChange} />
                    </div>
                    <div className="flex flex-col font-bold text-slate-500 bg-white-300! border-solid shadow-md p-4">
                        <label  >
                             Xuất xứ (Tiếng Anh)
                        </label>
                        <input type="text" name="origin_en"
                                onChange={handleChange} />
                    </div>
                      
                </div>
                    
             

                  {properties?.rows?.length >0 && properties?.rows.map((item) => {
                        return (
                          
                            <div className="flex justify-between px-10 py-2"  key={item.id}>
                              <label  className="w-[50%] pl-2 font-bold text-slate-500 bg-white-300! border-solid shadow-md py-2">
                                {item?.name_vn}
                              </label>
                             { item.PropertiesValues.length > 0 ? (
                              <select
                                
                                className="shadow-md py-2  bg-white-300  w-[170px] "
                                name={item?.id}
                                onChange={handleChange}
                              >
                                <option value="-1" className='bg-white-500'></option>
                                {item?.PropertiesValues.map(propertiesvalue =>{
                                  return(
                                    <option 
                                        className='!bg-white-500 '
                                        key={propertiesvalue?.id}
                                        value={propertiesvalue?.option}>
                                        {propertiesvalue.description}
                                    
                                    </option>
                                  )
                                })}
                               
                              </select>
                              ) : 
                              <div>
                                <input type="number" name={item?.id} onChange={handleChange} className="shadow-md py-2  bg-white-300  w-[170px] "/>
                              </div>
                               }
                            </div>
                          
                          
                        );
                      })}
              </div>
          

                    <div className="flex justify-center gap-5 items-center pt-5">
                  
                      <button
                        onClick={handleSubmit}
                        className='bg-gray-200 p-2 border rounded-sm'
                      >Thêm</button>
                    </div>
            
          </div>
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSpecies;
