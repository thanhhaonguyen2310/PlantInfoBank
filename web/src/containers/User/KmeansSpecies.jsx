import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions/species";
import api from "../../services/public.server";
import apis from "../../services/properties.services";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../store/actions/properties";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaSpinner } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

import * as XLSX from "xlsx";
import { KmeansCluster } from "../../services/kmeans";

const Kmeans = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to open modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [showModalButton, setShowModalButton] = useState(false);

  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [excelFile, setExcelFile] = useState(null);

  const [labels, setLabels] = useState([]);
  const [column, setColumn] = useState([]);
  const [cluster, setCluster] = useState(null);
  const [name, setName] = useState(null);
  const [index, setIndex] = useState(null);
  const [genus, setGenus] = useState("0");
  const handleChangeGenus = (e) => {
    // console.log(e.target.value)
    setGenus(e.target.value);
  };
  const handleCluster = (e) => {
    // console.log(e.target.value)
    setCluster(e.target.value);
  };
  const handleChangeValue = (event) => {
    const selectedGenus = event.target.value;
    setSelectedValue(selectedGenus);
    if (!selectedOptions.includes(selectedGenus)) {
      setSelectedOptions([...selectedOptions, selectedGenus]);
    }
    setTextareaValue([...selectedOptions, selectedGenus].join(", "));
  };
  const handleRemoveOption = (index) => {
    const newOptions = [...selectedOptions];
    newOptions.splice(index, 1);
    setSelectedOptions(newOptions);
    setTextareaValue(newOptions.join(", "));
  };
  const { properties } = useSelector((state) => state.properties);
  // submit state
  const [idGenus, setIdGenus] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = async () => {
    // e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[worksheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, {
        range: 0,
        cellDates: true,
        defval: -1, // Thay thế giá trị trống bằng -1
      });
      data.forEach((row) => {
        Object.keys(row).forEach((key) => {
          if (row[key] === " ") {
            // Thay thế giá trị bằng -1
            row[key] = -1;
          }
        });
      });
      //   console.log(worksheet)
      // const cluster = KmeansCluster(data);
      //   setIdGenus(worksheet['A1'].v.split(":")[1].trim())
      setExcelData(data);
    }
  };

  // const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDataKmeans = async () => {
    setLoading(true)
    if (excelFile !== null) {
      
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      // console.log(workbook)
      const worksheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[worksheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, {
        range: 0,
        cellDates: true,
        defval: -1, // Thay thế giá trị trống bằng -1
      });
      Object.keys(data[0]).forEach((key) => {
    
        const trimmedKey = key.trim();
       
        if (key !== trimmedKey) {
          Object.defineProperty(
            data[0],
            trimmedKey,
            Object.getOwnPropertyDescriptor(data[0], key)
          );
          delete data[0][key];
        }
      });
      data.forEach((row) => {
        
        Object.keys(row).forEach((key) => {
    
          if (row[key] === " ") {
            // Thay thế giá trị bằng -1
            row[key] = -1;
          }
        });
      });
      let nameColumnValues = [];
      const newData = data.map(row => {
        
        nameColumnValues.push(row.Name);
    
        const { Name, ...rest } = row;
        return rest; 
    });
    setLabels([])
    setName(nameColumnValues)

      let filteredData = [];
      if (selectedOptions.includes('all')) {
        newData.forEach((item) => {
          
          filteredData.push(item);
        });
      }
      else {
        data.forEach((item) => {
          const filteredItem = {};
  
          selectedOptions.forEach((key) => {
            if (item[key] !== undefined) {
              filteredItem[key] = item[key];
            }
          });
  
          filteredData.push(filteredItem);
        });
      }
      
      console.log(filteredData);
      let dataset = [cluster, filteredData];
      const response = await api.kmeans(dataset);
      setLabels(response?.results[0]?.labels);
      setExcelData(filteredData);
      setTextareaValue("");
      setGenus("0")
      setCluster(null)
      setExcelFile(null)
      setSelectedOptions([])
      setDisplayedData([])
      setLoading(false)
      const columns = {};

      for (let i = 0; i < filteredData.length; i++) {
        const row = filteredData[i];
        Object.keys(row).forEach(key => {
          if (!columns[key]) {
            columns[key] = [];
          }
          columns[key].push(row[key]);
        });
      }
        console.log(columns);
        
        const result = await apis.getPropertyColumn(columns)
        console.log(result.respone)
        setColumn(result.respone)

      }
      setShowModalButton(true);
  };
  // setShowModalButton(true);
  const handleClickInTextarea = (event) => {
    const { target } = event;
    if (target.classList.contains("remove-option")) {
      const index = parseInt(target.getAttribute("data-index"), 10);
      handleRemoveOption(index);
    }
  };
  const sortedLabels = labels.slice().sort((a, b) => a - b);

  const [displayedData, setDisplayedData] = useState([]);

  function transpose(matrix) {
    return matrix[0].map((_, columnIndex) => matrix.map(row => row[columnIndex]));
  }
  const handleGroupClick = (groupIndex) => {
    if(column && column.length){  
    // Biến đổi mảng column thành dạng dữ liệu hàng
      const columns = transpose(column);
      const filteredData = excelData
      console.log(columns)
      console.log("col",column)
      // const columns = column
      // console.log(columns[0].length)

      const columnNames = Object.keys(filteredData[0]);
      console.log(columnNames)
      let updatedExcelData = filteredData.map((row, rowIndex) => {
        const updatedRow = { ...row };
        const columnValues = columns[rowIndex]; // Lấy mảng giá trị cột cho hàng tương ứng

        if (columnValues && columnValues.length) {
            for (let j = 0; j < columnValues.length; j++) {
                // Sử dụng tên của cột từ excelData làm tên cột cho column
                const columnName = columnNames[j];
                updatedRow[columnName] = columnValues[j];
            }
        }

        return updatedRow;
    });
      console.log(updatedExcelData)

      const Data = updatedExcelData
        .map((item, index) => ({index: index + 1,name: name[index], ...item}))
        .filter(({index}) => labels[index-1] === groupIndex)
      setIndex(groupIndex)
      setDisplayedData(Data);
    }

    
  };
  console.log(displayedData);
  useEffect(() => {
    dispatch(getProperties(genus));
    if (textareaRef.current) {
      textareaRef.current.addEventListener("click", handleClickInTextarea);
    }
    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener("click", handleClickInTextarea);
      }
    };
  }, [genus, textareaValue]);
  return (
    <div className="w-full bg-white">
      <header className="py-4 bg-green-600 text-white text-center">
        <h1 className="text-3xl font-semibold">Gom cụm dữ liệu</h1>
        <p className="text-lg font-semibold text-blue-200"></p>
      </header>
      <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-blue-200 rounded-lg  w-full max-w-md">
          <form className="flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="file-upload" className="text-lg text-black">
                Tải lên tệp dữ liệu:
              </label>
              <input
                id="file-upload"
                type="file"
                className="w-full py-2 px-4 border border-blue-300 rounded-md"
                required
                onChange={handleFile}
              />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="genus-select" className="text-lg text-black">
                Chọn loại mẫu:
              </label>
              <select
                id="genus-select"
                className="w-full py-2 px-4 border border-blue-300 rounded-md"
                onChange={handleChangeGenus}
                value={genus}
              >
                <option value="0">Chọn loại mẫu</option>
                <option value="N">Lúa</option>
                <option value="B">Ngô</option>
                <option value="D">Dưa lưới</option>
                <option value="DN">Đậu nành</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <label htmlFor="cluster-input" className="text-lg text-black">
                Nhập số nhóm:
              </label>
              <input
                id="cluster-input"
                type="number"
                className="w-full py-2 px-4 border border-blue-300 rounded-md"
                required
                onChange={handleCluster}
              />
            </div>
          </form>
          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="attribute-select" className="text-lg text-black">
              Chọn thuộc tính:
            </label>
            <select
              id="attribute-select"
              className="w-full py-2 px-4 border border-blue-300 rounded-md"
              onChange={handleChangeValue}
              value={selectedValue}
            >
              <option value="0">Chọn thuộc tính</option>
              <option value="all" className="bg-white-500">
                    Chọn tất cả
                  </option>
              {properties?.rows?.length > 0 &&
                properties?.rows.map((item) => (
                  <option key={item.id} value={item.name_vn}>
                    {item.name_vn}
                  </option>
                ))}
            </select>
          </div>
          <div className="border border-blue-300 rounded-md p-4 mt-4">
            <h2 className="text-lg font-bold text-black mb-2">
              Danh sách thuộc tính đã chọn:
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map((option, index) => (
                <div key={index} className="bg-blue-100 py-1 px-2 rounded-md">
                  <span className="text-sm text-black">{option}</span>
                  <button
                    className="ml-2 text-black focus:outline-none"
                    onClick={() => handleRemoveOption(index)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            onClick={handleDataKmeans}
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded-md mt-4 focus:outline-none relative"
            disabled={loading}
          >
            <span className="flex items-center">
              Thực hiện
              {loading && <FaSpinner className="animate-spin ml-2" />}
            </span>
          </button>
        </div>

        <div className="flex flex-col justify-center items-center text-center mx-auto w-full mt-1">
          <div className="bg-green-600 text-white text-2xl px-20 py-3 rounded-t-lg w-full max-w-md">
            Kết quả phân cụm
          </div>
        </div>

        <div className="mt-0">
          {!loading && showModalButton && (
            <button
              onClick={openModal}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300 mt-4"
            >
              Open Modal
            </button>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
          >
            {/* Content of your modal */}
            {labels?.length > 0 && (
              <div className="flex justify-between">
                <div className="w-1/4 bg-blue-100 border border-blue-400 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">
                    Danh sách nhóm:
                  </h2>
                  <div className="space-y-2">
                    {Array.from(new Set(sortedLabels)).map((groupIndex) => (
                      <button
                        key={groupIndex}
                        onClick={() => handleGroupClick(groupIndex)}
                        className="block w-full py-2 px-4 text-left rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300 text-blue-800"
                      >
                        Nhóm {groupIndex + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {displayedData.length > 0 && (
                  <div className="w-3/4 p-4">
                    <div
                      className="bg-white rounded-lg shadow-md"
                      style={{ maxHeight: "550px", overflowY: "auto" }}
                    >
                      <div className="flex justify-between items-center px-6 py-4 border-b bg-blue-200">
                        <div>
                          <p className="text-xl font-bold text-blue-800">
                            Nhóm:{" "}
                            <span className="text-blue-500">{index + 1}</span>
                          </p>
                          <p className="text-xl font-bold text-blue-800">
                            Số lượng:{" "}
                            <span className="text-blue-500">
                              {displayedData.length}
                            </span>
                          </p>
                        </div>
                      </div>
                      <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-blue-200">
                          <th
                                  
                                  className="py-2 px-4 border border-gray-300 text-center bg-blue-200 text-blue-800"
                                >
                                  STT
                                </th>
                                <th
                                  
                                  className="py-2 px-4 border border-gray-300 text-center bg-blue-200 text-blue-800"
                                >
                                  Mẫu giống
                                </th>
                            {Object.keys(excelData[0]).map(
                              (columnName, columnIndex) => (
                                <th
                                  key={columnIndex}
                                  className="py-2 px-4 border border-gray-300 text-center bg-blue-200 text-blue-800"
                                >
                                  {columnName}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {displayedData.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className={
                                rowIndex % 2 === 0 ? "bg-blue-100" : ""
                              }
                            >
                              {Object.values(row).map(
                                (cellValue, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className="py-2 px-4 border border-gray-300 text-center"
                                  >
                                    {cellValue}
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition-colors duration-300"
            >
              Close Modal
            </button>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Kmeans;
