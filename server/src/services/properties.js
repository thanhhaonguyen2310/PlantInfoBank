import db from "../models";
const { Sequelize, DataTypes } = require("sequelize");
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createPropertiesService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const species = await db.Properties.findOne({
        where: { name_vn: data.name_vn },
        raw: false,
      });
      if (species) {
        resolve({
          err: 1,
          msg: "Thuộc tính đã tồn tại",
        });
      }
      /*

       */

      const properNew = await db.Properties.build({
        name_vn: data?.name_vn,
        name_en: data?.name_en,
      });
      // console.log(properNew)

      await properNew.save();
      // const properValueNew = await db.PropertiesValue.build({
      //         properties_id: properNew[0]?.id,
      //         description: data?.description,
      //         value: data?.value,
      // })
      // await properValueNew.save()
      resolve({
        err: 0,
        msg: "Created is successfully !",
      });
    } catch (error) {
      reject(error);
    }
  });
  function convertObjectToArray(inputObject) {
    return Object.entries(inputObject).map(([propertiesId, option]) => ({ propertiesId, option }));
  }
export const addSpeciesService = (id,data) =>
  new Promise(async (resolve, reject) => {
    try {
      const rawdata = convertObjectToArray(data);
      const speciesData = []
      const propertiesData = []
      for(let i =0; i< rawdata.length; i++){
        if(rawdata[i].propertiesId === 'name' || rawdata[i].propertiesId === 'name_other' || rawdata[i].propertiesId === 'origin_vn' || rawdata[i].propertiesId === 'origin_en'  ){
          speciesData.push(rawdata[i])
        }
        else propertiesData.push(rawdata[i])      
        
      }
      const speciesRespone = await db.Species.create({
        name: speciesData[0]?.option ,
        name_other: speciesData[1]?.option || 'chưa biết',
        origin_vn: speciesData[2]?.option || 'chưa biết',
        origin_en: speciesData[3]?.option || 'chưa biết',
        approve: 0,
        genus: id
      })
      console.log(speciesRespone);
      // console.log(propertiesData);
      const dataQuery = []
      for(let i =0; i < propertiesData?.length; i++){
        const propertiesValue = await db.PropertiesValue.findOne({
          where: {[Sequelize.Op.and]: propertiesData[i]}
        })
        const properValue = {
          speciesId: speciesRespone?.dataValues?.id,
          propertiesId: propertiesData[i]?.propertiesId,
          propertiesvalueId : propertiesValue?.dataValues?.id||null,
          value:  propertiesData[i]?.option
        }
        dataQuery.push(properValue)
      }
      console.log(dataQuery)


      const detailspecies = await db.DetailSpecies.bulkCreate(dataQuery)
      resolve({
        err: 0,
        msg: "Created is successfully !",
        detailspecies
      });
    } catch (error) {
      reject(error);
    }
  });
// export const updatePropertiesService = (data) => new Promise(async (resolve, reject) => {
//     try {
//             const properties = await db.Properties.findOne({
//                 where: {id: data.id},
//                 raw: false
//             })
//             if (!properties) {
//                 resolve({
//                     err: 1,
//                     msg: 'The user is not defined'
//                 })
//             }

//                 properties.id_loai= data.id_loai;
//                 properties.ten_mon= data.ten_mon;

//             await properties.save()
//             resolve({
//                 err: 0,
//                 msg: 'updated SUCCESS',
//             })
//         } catch (e) {
//             reject(e)
//         }
// })

export const deletePropertiesService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const properties = await db.Properties.findOne({
        where: { id: id },
      });
      if (!properties) {
        resolve({
          err: 2,
          msg: "Properties is not defined",
        });
      }

      await properties.destroy();

      resolve({
        err: 0,
        msg: "deleted SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });

export const getPropertyService = (id) =>
  new Promise(async (resolve, reject) => {
    console.log(id)
    try {
      const respone = await db.Properties.findAndCountAll({
        where: {
          id: {
            [Op.regexp]: `^${id}\\d+`
          }
        },
        include: [
  
          { model: db.PropertiesValue,
            group: ["propertiesId"]
          
          },
        ],
       
      });
      // console.log(respone)
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get post fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });
