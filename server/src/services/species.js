import db from "../models";
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createSpeciesService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const species = await db.Species.findOne({
        where: { name: data.name },
        raw: false,
      });
      if (species) {
        resolve({
          err: 1,
          msg: "Giống đã tồn tại",
        });
      }
      /*
       name: DataTypes.STRING,
    name_other: DataTypes.STRING,
    origin_vn: DataTypes.STRING,
    origin_en: DataTypes.STRING,
    language: DataTypes.STRING,
    provinceId: DataTypes.STRING,   
    flowering_day: DataTypes.DATE,
    replanting : DataTypes.DATE,

       */

      const response = await db.Species.build({
        name: data?.name,
        name_other: data?.name_other,
        origin_vn: data?.origin_vn,
        origin_en: data?.origin_en,
        provinceId: data?.provinceId,
        approve: data?.approve,
        // id: v4()
      });
      await response.save();
      resolve({
        err: 0,
        msg: "Created is successfully !",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllPropertyService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      const respone = await db.DetailSpecies.findAndCountAll({
        where: { speciesId: id },
        nest: true,
        include: [
          { model: db.Properties },
          { model: db.PropertiesValue },
          { model: db.Species },
        ],
        // attributes: ["value"],
        // group: ['propertiesId'],
        distinct: true,
      });
      console.log(respone.length);
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get properties fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllSpeciesService = (id, page) =>
  new Promise(async (resolve, reject) => {
    // console.log(page);
    try {
      const respone = await db.Species.findAndCountAll({
        where: { genusId: id },
        raw: true,
        nest: true,
        offset: page * 12,
        limit: 12,
      });
      // console.log(respone)
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get species fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteSpeciesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const speciesIdsToDelete = [1, 2];
      // for(let i=1;i<=42;i++){
      //   speciesIdsToDelete.push(i)
      // }

      const respone = await db.DetailSpecies.destroy({
        where: {
          speciesId: {
            [Op.in]: speciesIdsToDelete,
          },
        },
      });
      // console.log(respone)
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get species fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });
