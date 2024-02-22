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
  return Object.entries(inputObject).map(([propertiesId, option]) => ({
    propertiesId,
    option,
  }));
}
export const addSpeciesService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      const rawdata = convertObjectToArray(data);
      const speciesData = [];
      const propertiesData = [];
      let genusId = 0;
      for (let i = 0; i < rawdata.length; i++) {
        if (rawdata[i].propertiesId === "id") {
          genusId = rawdata[i].option;
        } else if (
          rawdata[i].propertiesId === "name" ||
          rawdata[i].propertiesId === "name_other" ||
          rawdata[i].propertiesId === "origin_vn" ||
          rawdata[i].propertiesId === "origin_en"
        ) {
          speciesData.push(rawdata[i]);
        } else propertiesData.push(rawdata[i]);
      }
      const speciesRespone = await db.Species.create({
        name: speciesData[0]?.option,
        name_other: speciesData[1]?.option || "chưa biết",
        origin_vn: speciesData[2]?.option || "chưa biết",
        origin_en: speciesData[3]?.option || "chưa biết",
        approve: 0,
        genusId,
      });
      console.log(speciesRespone);
      // console.log(propertiesData);
      const dataQuery = [];
      for (let i = 0; i < propertiesData?.length; i++) {
        const propertiesValue = await db.PropertiesValue.findOne({
          where: { [Sequelize.Op.and]: propertiesData[i] },
        });
        const properValue = {
          speciesId: speciesRespone?.dataValues?.id,
          propertiesId: propertiesData[i]?.propertiesId,
          propertiesvalueId: propertiesValue?.dataValues?.id || null,
          value: propertiesData[i]?.option,
        };
        dataQuery.push(properValue);
      }
      console.log(dataQuery);

      const detailspecies = await db.DetailSpecies.bulkCreate(dataQuery);
      const addSpecies = await db.AddSpecies.create({
        speciesId: speciesRespone?.dataValues?.id,
        userId: id.id,
      });
      resolve({
        err: 0,
        msg: "Created is successfully !",
        detailspecies,
      });
    } catch (error) {
      reject(error);
    }
  });
export const addSpeciesExcelService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const { idGenus, excelData } = data;
      // console.log(idGenus)
      const rawData = [];
      for (let i in excelData) {
        rawData.push(convertObjectToArray(excelData[i]));
      }
      const gen = await db.Genus.findOne({
        where: { name_vn: idGenus },
      });
      // console.log(id)
      // console.log(gen);
      let species = [];
      let property = [];

      rawData.forEach((subArray) => {
        let speciesArray = [];
        let propertyArray = [];
        subArray.forEach((item) => {
          if (
            item.propertiesId === "name" ||
            item.propertiesId === "name_other" ||
            item.propertiesId === "origin_vn" ||
            item.propertiesId === "origin_en"
          ) {
            speciesArray.push(item);
          } else {
            propertyArray.push(item);
          }
        });
        if (speciesArray.length > 0) {
          species.push(speciesArray);
        }

        if (propertyArray.length > 0) {
          property.push(propertyArray);
        }
      });
      // console.log(species);
      const idSpecies = [];
      for (const subArray of species) {
        const speciesResponse = await db.Species.create({
          name: subArray[0]?.option,
          name_other: subArray[1]?.option || "chưa biết",
          origin_vn: subArray[2]?.option || "chưa biết",
          origin_en: subArray[3]?.option || "chưa biết",
          approve: 0,
          genusId: gen?.dataValues.id,
        });
        idSpecies.push(speciesResponse?.dataValues.id);
      }
      console.log(property);
      console.log(idSpecies);
      const propertiesArray = [];
      for (let i = 0; i < property.length; i++) {
        const dataValue = await db.PropertiesValue.findAll({
          where: { [Sequelize.Op.or]: property[i] },
          attributes: ["id"],
        });
        // console.log(dataValue[0].dataValues.id)
        propertiesArray.push(
          dataValue.map((property) => property.dataValues.id)
        );
      }
      console.log(propertiesArray);
      const dataQuerry = [];
      property.forEach((propertyRow, rowIndex) => {
        const newRow = [];
        console.log(rowIndex)
        propertyRow.forEach((property, colIndex) => {
          const newData = {
            speciesId: idSpecies[rowIndex],
            propertiesId: property.propertiesId,
            propertiesvalueId: propertiesArray[rowIndex][colIndex],
            value: property.option,
          };
          newRow.push(newData);
        });
        dataQuerry.push(newRow);
      });

      
      for(let i = 0; i< idSpecies.length;i++){
        // console.log(dataQuerry[i]);
        // console.log(idSpecies[i]);
        const detailspecies = await db.DetailSpecies.bulkCreate(dataQuerry[i])
        const addSpecies = await db.AddSpecies.create({
          speciesId: idSpecies[i],
          userId: id.id
        })
      }
      resolve({
        err: 0,
        msg: "Created is successfully !",
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
    console.log(id);
    try {
      const respone = await db.Properties.findAndCountAll({
        where: {
          id: {
            [Op.regexp]: `^${id}\\d+`,
          },
        },
        include: [{ model: db.PropertiesValue, group: ["propertiesId"] }],
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
