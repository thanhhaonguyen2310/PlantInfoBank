import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {getAllProvince} from '../../store/actions/province';
import api from "../../services/province.services";
import {getAllSpecies} from "../../store/actions/species"
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddArea = () => {
    const dispatch = useDispatch();
    const {species} = useSelector(state => state.species)
    const {province} = useSelector(state => state.province)
    const [selection, setSelection] = useState(null);
    const [checkbox, setCheckbox] = useState([]);
    // console.log(province)
    const handleChange = (e) => {
        // console.log(e.target.name)
        setSelection(e.target.value)
      }
    const handleCheckboxChange = (e) => {
        const provinceId = parseInt(e.target.value);
        if (e.target.checked) {
            setCheckbox([...checkbox, provinceId]);
        } else {
            setCheckbox(checkbox.filter(id => id !== provinceId));
        }
    }
    const handleAddArea = async() =>{
        const data = {selection,checkbox}
        const respone = await api.addArea(data)
        console.log(respone)
        setCheckbox([])
        setSelection(null)
    }
    console.log(checkbox)
    console.log(selection)
    useEffect(() => {
        dispatch(getAllSpecies())
        dispatch(getAllProvince())
      }, []);
  return (
    <div className="w-full bg-white mt-10 ">
      <div className=" pl-10  flex flex-col">
        <div className="flex justify-center ">
          <span className="text-4xl text-slate-500">
            Thêm vùng phân bố cho mẫu giống
          </span>
          
        </div>

        <div className="flex justify-center items-center  gap-20 mt-20">
            <span className="text-xl shadow-sm p-2 "> Chọn mẫu giống :</span>
            <select
              className="shadow-md py-2  bg-white-300  w-[170px] "
              onChange={handleChange}
            > 
                <option value="0" className="bg-white-500">Chọn ở đây</option>
            {species && species.map((item) => {
                return(
                    <option key={item?.id} value={item?.id} className="bg-white-500">{item?.name}</option>
                )
            })
                
            }
            </select>
        </div>
        <div>
          <button 
            onClick={handleAddArea}
            className="text-xl bg-slate-200 hover:text-green-500 hover:shadow-lg hover:p-3 hover:animate-pulse p-2">
              Thực hiện
            </button>
        </div>
        <div className="flex justify-center items-center gap-4 mt-10">
                    
                    <div className="flex flex-row flex-wrap justify-between w-full">
                        {province.map(item => (
                            <label key={item.id} className="flex items-center w-[30%] mb-4 gap-2 bg-slate-300 p-3 shadow-lg">
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={handleCheckboxChange}
                                    checked={checkbox.includes(item.id)}
                                />
                                <span className="ml-1">{item.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddArea