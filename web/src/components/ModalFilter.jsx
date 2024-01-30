import React, {useState, useEffect} from 'react';
import { useLocation,  useNavigate } from 'react-router-dom';
import { getProperties } from '../../src/store/actions/properties'
import * as actions from "../store/actions/species"
import {useDispatch, useSelector} from 'react-redux'
import { MdClose } from "react-icons/md";

const ModalFilter = ({ idModal, isShowModal, setIsShowModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {properties }=  useSelector(state  =>  state.properties)
    console.log(properties)
    const [filter, setfilter] = useState({});
    const handleChange = (e) => {
      console.log(e.target.name)
      setfilter({...filter, [e.target.name]: e.target.value})
    }
    console.log(filter)

    const handleSubmit = async() =>{
      dispatch(actions.saveSpecies(filter))
      console.log(filter)
      setIsShowModal(false)
      navigate('/genusfilter')
  }

  useEffect(() => {
        dispatch(getProperties(idModal))
  },[idModal])

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
                <span className='uppercase text-red-500 text-center text-xl'>Bộ Lọc</span>  
                  <div className="gap-2">
                  {properties?.rows?.length >0 && properties?.rows.map((item) => {
                        return (
                          item.PropertiesValues.length > 0 ? (
                            <div className="flex justify-between px-10 py-2 items-center bg-gray-100" key={item.id}>
                              <label  className="w-[50%] pl-2 font-bold text-slate-500 bg-white-300! border-solid shadow-md py-2">
                                {item?.name_vn}
                              </label>
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
                            </div>
                          ) : null
                        );
                      })}
               
                    <div className="flex justify-center gap-5 items-center pt-5">
                      <button
                        className='bg-gray-200 p-2 border rounded-sm'
                        onClick={() =>
                           setIsShowModal(false)
                        }                        
                      >Hủy</button>
                      <button
                        onClick={handleSubmit}
                        className='bg-gray-200 p-2 border rounded-sm'
                      >Search</button>
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

export default ModalFilter;
