import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions/species";
import api from "../../services/public.server";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../store/actions/properties";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa";

import * as XLSX from "xlsx";
import { KmeansCluster } from "../../services/kmeans";
const Kmeans = () => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [excelFile, setExcelFile] = useState(null);

  const [labels, setLabels] = useState([]);
  const [cluster, setCluster] = useState(null);
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
        // Lặp qua mỗi cột
        Object.keys(row).forEach((key) => {
          // Kiểm tra nếu giá trị là null hoặc undefined
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
  const handleDataKmeans = async () => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[worksheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, {
        range: 0,
        cellDates: true,
        defval: -1, // Thay thế giá trị trống bằng -1
      });
      Object.keys(data[0]).forEach((key) => {
        // Loại bỏ các khoảng trắng từ tên cột
        const trimmedKey = key.trim();
        // Nếu tên cột đã thay đổi, cập nhật tên cột trong đối tượng dữ liệu
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
        // Lặp qua mỗi cột
        Object.keys(row).forEach((key) => {
          // Kiểm tra nếu giá trị là null hoặc undefined
          if (row[key] === " ") {
            // Thay thế giá trị bằng -1
            row[key] = -1;
          }
        });
      });

      
      console.log(data);

      const filteredData = [];

      data.forEach((item) => {
        const filteredItem = {};

        selectedOptions.forEach((key) => {
          if (item[key] !== undefined) {
            filteredItem[key] = item[key];
          }
        });

        filteredData.push(filteredItem);
      });

      console.log(filteredData);
      let dataset = [cluster, filteredData];
      const response = await api.kmeans(dataset);
      console.log(response?.results[0]);
      console.log(response?.results[0]?.labels);
      setLabels(response?.results[0]?.labels);
      setExcelData(filteredData);
    }
  };

  const handleClickInTextarea = (event) => {
    const { target } = event;
    if (target.classList.contains("remove-option")) {
      const index = parseInt(target.getAttribute("data-index"), 10);
      handleRemoveOption(index);
    }
  };
  // display nhóm
  const [displayedData, setDisplayedData] = useState([]);

  // Hàm xử lý sự kiện khi click vào nút nhóm
  const handleGroupClick = (groupIndex) => {
    // Lọc dữ liệu tương ứng với nhóm được chọn
    const filteredData = excelData.filter(
      (item, index) => labels[index] === groupIndex
    );
    // Cập nhật dữ liệu được hiển thị
    setDisplayedData(filteredData);
  };
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
    <div className="w-full bg-white mt-10 ">
      <div className="flex flex-col justify-center items-start">
        <div className="flex justify-center items-center text-center mx-auto gap-20">
          <span className="text-4xl text-slate-500 ">Gom cụm dữ liệu</span>
        </div>
        <div className="flex flex-col gap-5 justify-start p-10  ">
          <form
            className=" flex  gap-3 justify-between items-center "
            onSubmit={handleFileSubmit}
          >
            <div className="min-h-40 flex flex-col gap-3 justify-start items-center my-auto mt-6">
              <div className="flex gap-1 p-1 text-center items-center">
                <label htmlFor="" className="text-md  text-red-600">
                  Đọc dữ liệu:
                </label>
                <input
                  type="file"
                  className="flex text-center justify-center "
                  required
                  onChange={handleFile}
                />
              </div>
              <div className="flex  gap-3 p-1 justify-start text-center items-center  mr-auto">
                <label htmlFor="" className="text-md  text-red-600  ">
                  Chọn mẫu:
                </label>
                <select
                  className="shadow-md py-2  bg-white-300  w-[120px] h-[35px] text-center text-[15px]"
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
              <div className="flex gap-1 p-1 text-center items-center mr-auto">
                <label
                  htmlFor=""
                  className="flex flex-col text-md  text-red-600"
                >
                  Chọn số nhóm:
                  {/* <span className="text-[10px]">Lưu ý: Chọn số nhóm phải nhỏ hơn mẫu </span> */}
                </label>
                <input
                  type="number"
                  className="flex text-center justify-center border "
                  required
                  onChange={handleCluster}
                />
              </div>
            </div>
            <div className="w-[60%] flex flex-col gap-3 justify-start items-center">
              <div className="flex  gap-3 p-1 justify-start text-center items-center  mr-auto">
                <label htmlFor="" className="text-md  text-red-600  ">
                  Danh sách thuộc tính:
                </label>
                <select
                  className="shadow-md py-2  bg-white-300  w-[120px] h-[35px] text-center text-[15px]"
                  onChange={handleChangeValue}
                  value={selectedValue}
                >
                  <option value="0" className="bg-white-500">
                    Chọn ở đây
                  </option>
                  {properties?.rows?.length > 0 &&
                    properties?.rows.map((item) => {
                      return (
                        <option
                          value={item?.name_vn}
                          className="bg-white-500"
                          key={item?.id}
                        >
                          {item?.name_vn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div
                className=" flex gap-4 p-5 min-w-80 min-h-20 border border-slate-400"
                ref={textareaRef}
              >
                {selectedOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-1 gap-2 bg-slate-400"
                  >
                    <span className="text-[13px]">{option}</span>
                    <span
                      className="text-red-600 cursor-pointer text-md remove-option"
                      data-index={index}
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </form>
          <div>
            <button
              type="submit"
              onClick={handleDataKmeans}
              className="flex justify-center items-center gap-1 transition duration-300 ease-in-out hover:text-green-600 hover:shadow-md p-2 mx-auto"
            >
              <span className="text-xl text-green-300 transition duration-300 ease-in-out hover:text-green-600">
                Thực hiện
              </span>
              <FaCheck />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center mx-auto w-full">
          <div className="text-center bg-gray-300   ">
            <p className="text-2xl px-20 py-3">Kết quả phân cụm</p>
          </div>
        </div>
        {labels?.length > 0 && (
          <div className="flex justify-between items-center gap-10 w-full">
            <div className="w-[15%]  border border-slate-400 top-0 relative overflow-y-auto">
              <div className="flex flex-col py-2">
                {Array.from(new Set(labels)).map((groupIndex) => (
                  <button
                    key={groupIndex}
                    onClick={() => handleGroupClick(groupIndex)}
                  >
                    Nhóm {groupIndex + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-[85%] p-5 top-5">
              <div className="flex flex-col gap-5">
                <div className="top-5">
                  <p className="text-xl font-bold">Số lượng:  <span className="text-blue-500 p-1">{displayedData.length}</span></p>
                </div>
                <table className="border-2 border-gray-300 text-center">
                  <thead>
                    <tr className=" py-2 px-4 border-2 text-[18px] right-2">
                      {/* Tạo tiêu đề cột từ các tên cột */}
                      {Object.keys(excelData[0]).map((columnName) => (
                        <th key={columnName} className=" py-2 px-4 border-2 text-[18px] right-2">{columnName}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Hiển thị dữ liệu từng hàng */}
                    {displayedData.map((row, rowIndex) => (
                      <tr key={rowIndex} className=" py-2 px-4 border-2 text-[18px] right-2">
                        {/* Hiển thị dữ liệu từng ô */}
                        {Object.values(row).map((cellValue, cellIndex) => (
                          <td key={cellIndex} className=" py-2 px-4 border-2 text-[18px] right-2">{cellValue}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Kmeans;
