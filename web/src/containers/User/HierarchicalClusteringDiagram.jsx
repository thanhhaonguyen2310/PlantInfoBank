import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../../store/actions/properties";
import { getCurrent } from "../../store/actions/user";
import api from "../../services/public.server";
import * as actions from "../../store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck,FaSpinner } from "react-icons/fa";
import image from '../../assets/dendrogram.png'



import * as XLSX from "xlsx";

const HierarchicalClusteringDiagram = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [linkage, setLinkage] = useState(null);
  const [excelData, setExcelData] = useState(null);
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
  const [loading, setLoading] = useState(false);
  const handleAddExcel = async() =>{
    try {
      setLoading(true);
      const response = await api.hierarchical(excelData);
      console.log(response)
      setLinkage(response.results[0])
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi nếu cần
      setLoading(false); 
    }
    
  }
  console.log(excelData)
  // useEffect(() => {
   
   
  // }, [linkage]);
  return (
    <div className="w-full bg-white mt-10 ">
      <header className="py-4 bg-green-600 text-white text-center">
        <h1 className="text-3xl font-semibold">Hierarchical Clustering Diagram</h1>
        <p className="text-lg font-semibold text-blue-200"></p>
      </header>
        
        <div className="flex justify-center p-10  ">
        <form
          className="flex flex-col gap-3 items-center bg-gray-100 p-6 rounded-lg shadow-md"
          onSubmit={handleFileSubmit}
        >
          <label htmlFor="file-upload" className="text-xl uppercase text-red-600">
            Tải file lên ở đây
          </label>
          <input
            id="file-upload"
            type="file"
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
            required
            onChange={handleFile}
          />


          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Tải file
          </button>
          {typeError && (
            <div className="text-red-600">{typeError}</div>
          )}
        </form>
        </div>
        <div >
          {excelData &&
          <button  
            onClick={handleAddExcel}
            className="flex justify-start items-center gap-1 transition duration-300 ease-in-out hover:text-green-600 hover:shadow-md p-2">
              {/* <span className="text-green-300 transition duration-300 ease-in-out hover:text-green-600">Xác nhận</span><FaCheck/> */}
              {loading ? (
                <FaSpinner className="text-lg animate-spin" />
              ) : (
                <>
                  <FaCheck className="text-lg" />
                  <span className="text-lg font-semibold">Xác nhận</span>
                </>
              )}
            </button>
          }
        </div> 

        <div className="flex justify-center items-center ">        
          {/* {linkage && <Dendrogram linkage={linkage}/>} */}
          {linkage &&
            <div >
              <img src={image} alt="dendrogram" className="w-[700px] h-[450px]"/>
            </div>
          
          }
        </div>     
      
      
      {/* <ToastContainer /> */}
    </div>
  );
};




export default HierarchicalClusteringDiagram