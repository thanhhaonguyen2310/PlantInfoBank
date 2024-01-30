import db from "../models";
const { Sequelize, DataTypes } = require("sequelize");
import { Op } from "sequelize";
import { v4 } from "uuid";
import propertiesValue from "../migrations/properties-value";

export const createDetailspeciesService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(data);
      const properArray = []
      for(let i =0; i < data?.value.length; i++){
        const properValue = {
          propertiesId:data?.properties[i],
          option : data?.value[i]
        }
        properArray.push(properValue)
      }
      const dataValue = await db.PropertiesValue.findAndCountAll({
        where:{[Sequelize.Op.or]: properArray},
        attributes: ["id"]
      })
      // const array = dataValue.rows
      // console.log(dataValue.rows[0].dataValues.id)
      const  speciesId = await db.Species.findOne({
        where: {name: data?.name}
      })
      const dataQuery = []
      for(let i =0; i < data?.value.length; i++){
        const properValue = {
          speciesId: speciesId?.dataValues.id,
          propertiesId:data?.properties[i],
          propertiesvalueId : dataValue?.rows[i]?.dataValues?.id||null,
          value: data?.value[i]
        }
        dataQuery.push(properValue)
      }
      console.log(dataValue?.rows)


      const detailspecies = await db.DetailSpecies.bulkCreate(dataQuery)
      // const detailspecies = await db.DetailSpecies.build({
      //   propertiesId: data?.propertiesId,
      //   speciesId: data?.speciesId,
      //   propertiesvalueId: data?.propertiesvalueId,
      //   value: data?.value,
      // });
      // await detailspecies.save();
      resolve({
        err: 0,
        msg: "Created is successfully !",
        dataValue
      });

    } catch (error) {
      reject(error);
    }
  });

export const updateDetailSpeciesService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const detailspecies = await db.DetailSpecies.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!detailspecies) {
        resolve({
          err: 1,
          msg: "detailspecies is not defined",
        });
      }

      detailspecies.value = data.value;

      await detailspecies.save();
      resolve({
        err: 0,
        msg: "updated SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });

export const deleteDetailSpeciesService = (id) =>
  new Promise(async (resolve, reject) => {
    console.log(id)
    try {
      const detailspecies = await db.DetailSpecies.destroy({
        where: { speciesId: id },
      });
      // if (!detailspecies) {
      //   resolve({
      //     err: 2,
      //     msg: "detailspecies is not defined",
      //   });
      // }

      // await detailspecies.destroy();

      resolve({
        err: 0,
        msg: "deleted SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });

// export const getAllDetailSpeciesService = () => new Promise(async(resolve, reject) => {
//     try {

//         const respone = await db.DetailSpecies.findAll({
//             where: {value: [2,3]},
//             // raw: true,
//             include: [
//                 // {model: db.Image, as: 'images', attributes: ['image']},
//                 {model: db.Species},
//                 {model: db.Properties},
//                 {model: db.PropertiesValue},
//                 // {model: db.DetailSpecies},
//             ],
//             // group: ['speciesId']
//             // attributes: ['id', 'ten_mon','anh_mon','gia','mo_ta']
//         })
//         // console.log(respone)
//         resolve({
//             error: respone ? 0:1,
//             msg: respone? 'OK': 'Get post fail.',
//             respone
//         })
//     } catch (error) {
//         reject(error)
//     }
// })

// export const getAllDetailSpeciesService = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const propertyValuePairs = [
//         { propertiesId: "N11", value: 1 },
//         { propertiesId: "N20", value: 2 },
//         // ... thêm các cặp propertiesId và value khác nếu cần
//       ];
//       const respone = await db.Species.findAll({
//         include: [
//           {
//             model: db.DetailSpecies,
//             attributes: [],
//             where: {
//               [Sequelize.Op.and]: propertyValuePairs.map(
//                 ({ propertiesId, value }) => ({
//                   propertiesId,
//                   value,
//                 })
//               ),
//             },
//             group: ["speciesId"],
//           },
//         ],

//         // having: Sequelize.literal(
//         //   `COUNT(DISTINCT DetailSpecies.speciesId) = ${propertyValuePairs.length}`
//         // ),
//       });
//       // console.log(respone)
//       resolve({
//         error: respone ? 0 : 1,
//         msg: respone ? "OK" : "Get post fail.",
//         respone,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

export const getAllDetailSpeciesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const propertyValuePairs = [
        { propertiesId: "N11", value: 1 },
        { propertiesId: "N20", value: 2 },
        { propertiesId: "N22", value: 3 },
        { propertiesId: "N23", value: 0 },
        // ... thêm các cặp propertiesId và value khác nếu cần
      ];
      const res = await db.DetailSpecies.findAll({
        // model: db.DetailSpecies,
        where: {
          [Sequelize.Op.or]: propertyValuePairs.map(
            ({ propertiesId, value }) => ({
              propertiesId,
              value,
            })
          ),
        },
        attributes: [
          "speciesId",
          [Sequelize.fn("count", Sequelize.col("speciesId")), "cnt"],
        ],
        group: ["speciesId"],

        // having: Sequelize.literal(
        //   `COUNT(DISTINCT DetailSpecies.speciesId) = ${propertyValuePairs.length}`
        // ),
      });
      // console.log(res);
      const species_id = res.map((data) => {
        if (data.dataValues.cnt >= propertyValuePairs.length)
          return data.dataValues.speciesId;
      });
      // const species_id = [];
      // for (var data in res) {
      //   console.log(data);
      //   if (data.dataValues.cnt >= propertyValuePairs.length)
      //     species_id.append(data.dataValues);
      // }
      // console.log(species_id);
      const respone = await db.Species.findAll({
        where: { id: { [Sequelize.Op.in]: species_id } },
      });
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get post fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });
