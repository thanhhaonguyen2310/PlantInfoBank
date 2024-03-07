import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../../store/actions/properties";
import { getCurrent } from "../../store/actions/user";
import api from "../../services/public.server";
import * as actions from "../../store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";



import * as XLSX from "xlsx";
import Dendrogram from "../../components/Dendrogram";
const HierarchicalClusteringDiagram = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [linkage, setLinkage] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const {currentData} = useSelector(state => state.user)
  const handleFile=(e)=>{
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
        }
        setLinkage(null)
      }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
        setLinkage(null)
      }
    }
    else{
      setLinkage(null)
      console.log('Please select your file');
    }
  }

  const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type: 'buffer'});
      const worksheetName = workbook.SheetNames[0];
      
      const worksheet = workbook.Sheets[worksheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, {
        range: 0,
        cellDates: true,
        defval: -1 // Thay thế giá trị trống bằng -1
    });
    data.forEach(row => {
      // Lặp qua mỗi cột
      Object.keys(row).forEach(key => {
          // Kiểm tra nếu giá trị là null hoặc undefined
          if (row[key] === " ") {
              // Thay thế giá trị bằng -1
              row[key] = -1;
          }
      });
    });
      setExcelData(data);
    }
    
  }
  const handleAddExcel = async() =>{
    const response = await api.hierarchical(excelData);
    console.log(response)
    setLinkage(response.results[0])
  }
  console.log(excelData)
  // useEffect(() => {
   
   
  // }, [linkage]);
  return (
    <div className="w-full bg-white mt-10 ">
      <div className=" pl-10  flex flex-col ">
        <div className="flex justify-center  gap-20">
          <span className="text-4xl text-slate-500 ">
            Thêm mẫu giống từ file excel
          </span>
        </div>
        <div className="flex justify-center p-10  mt-10">
          <form
            className=" flex flex-col gap-3 justify-center items-center "
            onSubmit={handleFileSubmit}
          >
            <label htmlFor="" className="text-xl uppercase text-red-600">
              Upload file ở đây
            </label>
            <input
              type="file"
              className="form-control flex text-center justify-center"
              required
              onChange={handleFile}
            />
            <button
              type="submit"
              className="text-xl  text-center hover:text-blue-400"
            >
              Tải file 
            </button>
            {typeError&&(
                <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
          </form>
        </div>
        <div >
          {excelData &&
          <button  
            onClick={handleAddExcel}
            className="flex justify-start items-center gap-1 transition duration-300 ease-in-out hover:text-green-600 hover:shadow-md p-2"><span className="text-green-300 transition duration-300 ease-in-out hover:text-green-600">Xác nhận</span><FaCheck/></button>
          }
        </div> 

        <div className="flex justify-center items-center h-auto mt-10">        
        {linkage && <Dendrogram linkage={linkage}/>}
      </div>     
      </div>
      
      {/* <ToastContainer /> */}
    </div>
  );
};




export default HierarchicalClusteringDiagram