import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../../src/store/actions/species";
import { useDispatch, useSelector } from "react-redux";
import { Maps } from "./Maps";
import { getProvince } from "../store/actions/province";

export const DetailGen = () => {
  const { id } = useParams();
  // console.log(id)
  const dispatch = useDispatch();
  const { detailspecies } = useSelector((state) => state.species);
  const { province } = useSelector((state) => state.province);
  console.log(detailspecies);
  useEffect(() => {
    dispatch(getProperty(id));
    dispatch(getProvince(id))
  }, [id]);
  return (
    <div className="flex justify-between p-10 bg-white">
      <div className="w-4/5">
        <h3 className="p-3 text-xl font-bold  text-teal-500 uppercase">Bảng chi tiết về đặc điểm hình thái và nông học của mẫu giống</h3>
        <table className="table-auto border border-solid  border-slate-600 p-2">
          <thead>
            <tr>
              <th className="border p-2 text-gray-400">Mẫu giống : <span>{detailspecies[0]?.Species?.name}</span></th>
              <th className="border p-2 text-gray-400">Tên trước kia : <span>{detailspecies[0]?.Species?.name_other}</span></th>
              <th className="border p-2 text-gray-400">Nơi thu giống : <span>{detailspecies[0]?.Species?.origin_vn}</span></th>
              <th className="border p-2 text-gray-400">Xuất xứ: <span>chưa biết</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center text-xl text-brown-200 font-bold " colSpan="4">Đặc tính cụ thể của mẫu giống </td>          
            </tr>
            {detailspecies?.length > 0 && detailspecies?.map(item => {
                        return (
                          <tr key={item.id}>
                            <td className="border p-2 text-left" colSpan="2">{item?.Properties?.name_vn}</td>
                            <td className="border p-2 text-left" colSpan="2">{item?.PropertiesValue ? item.PropertiesValue.description : item.value}</td>
                          </tr>
                          
                      )
                    })}

          </tbody>
        </table>
      </div>
      <div className="w-2/5">
          <h3 className="p-3 text-xl font-bold text-center text-teal-500 uppercase">Các địa điểm gieo trồng</h3>
          <div className="">
              <Maps province={province}/>
          </div>
          
      </div>
    </div>
  );
};
