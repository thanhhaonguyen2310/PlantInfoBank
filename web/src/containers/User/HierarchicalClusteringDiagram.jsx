import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProperties } from "../../store/actions/properties";
import { getCurrent } from "../../store/actions/user";
import api from "../../services/properties.services";
import * as actions from "../../store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";



import * as XLSX from "xlsx";
import { distanceMatrix } from "../../services/hierarchicalclustering";
const HierarchicalClusteringDiagram = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [idGenus, setIdGenus] = useState(null);
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
      }
      else{
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
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
        range: 1,
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
      console.log(worksheet)
      const dataMatrix = distanceMatrix(data)
      setIdGenus(worksheet['A1'].v.split(":")[1].trim())
      setExcelData(data);
    }
    
  }
  const handleAddExcel = async() =>{
    // dispatch(actions.saveGenus(data))
    const data = {idGenus,excelData}
    const response = await api.addSpeciesExcel(currentData?.id,data)
  }
  console.log(excelData)
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
        <div className="viewer snap-x snap-mandatory overflow-x-auto  p-10">
        {excelData?(
          <div className="table-responsive">
            <table className="min-w-full bg-white border-2 border-gray-300 text-center ">

              <thead className="py-1">
                <tr >
                  <th className=" py-2 px-4 border-2 text-[18px] right-2">STT</th>
                  {Object.keys(excelData[0]).map((key)=>(
                    <th key={key} className=" py-2 px-4 border-2 text-[18px] right-2">{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index)=>(
                  <tr key={index}>
                    <td className="py-2 px-4 border-2 text-center w-full">{index + 1}</td>
                    {Object.keys(individualExcelData).map((key)=>(
                       <td key={key}  className="py-2 px-4 border-2 text-center w-full">{ individualExcelData[key]}</td> 
                            
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ):(
        //   <div>No File is uploaded yet!</div>null
        null
        )}
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};




export default HierarchicalClusteringDiagram