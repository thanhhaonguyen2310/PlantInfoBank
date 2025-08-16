import { response } from "express";
import db from "../models";
const { Sequelize, DataTypes } = require("sequelize");
import { Op, where } from "sequelize";
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
      const speciesId = await db.Species.findOne({
        where: { name: id },
      });
      const respone = await db.DetailSpecies.findAndCountAll({
        where: { speciesId: speciesId?.dataValues.id },
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

export const getIdSpeciesService = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(name);
      const respone = await db.Species.findOne({
        where: { name: name },
      });
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get id species fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });
export const setApproveService = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(data);

      const respone = await db.Species.findOne({
        where: { id },
      });
      respone.approve = data[0];
      await respone.save();
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get id species fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getSpeciesService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await db.Species.findAll({
        // attributes: ["name"]
      });
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get  species fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllAddSpeciesService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await db.AddSpecies.findAll({
        include: [
          {
            model: db.Species,
            where: { approve: id },
          },
          { model: db.User },
        ],
      });
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get id species fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAddSpeciesService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await db.AddSpecies.findAll({
        where: { userId: id },
        include: [{ model: db.Species }],
      });
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get id species fail.",
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
        include: [{ model: db.DetailImages, include: { model: db.Image } }],
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

function convertObjectToArray(inputObject) {
  return Object.entries(inputObject).map(([propertiesId, value]) => ({
    propertiesId,
    value,
  }));
}
export const getAllFilterSpeciesService = ({ data }) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      // const e = { DN5: '3', DN6: '3', DN3: '3' }
      const propertyValuePairs = convertObjectToArray(data.data);
      console.log(propertyValuePairs);
      // const propertyValuePairs = [
      //   { propertiesId: "N11", value: 1 },
      //   { propertiesId: "N20", value: 2 },
      //   { propertiesId: "N22", value: 3 },
      //   // { propertiesId: "N23", value: 0 },
      //   // ... thêm các cặp propertiesId và value khác nếu cần
      // ];
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
        // limit: 12,
        include: [{ model: db.DetailImages, include: { model: db.Image } }],
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
const fs = require("fs");

function saveJSONToFile(jsonString, filePath) {
  fs.writeFileSync(filePath, jsonString);
}
const filePath = "D:\\LVTN\\LVTN_1\\server\\src\\services\\data.json";
const { PythonShell } = require("python-shell");
const pythonScript = "kmeans.py";
export const KmeansService = (data) =>
  new Promise(async (resolve, reject) => {
    // console.log("data",data);
    let jsonString = JSON.stringify(data);
    // console.log("jsonString:",jsonString)
    // let jsonString = JSON.stringify(data);
    // const sizeInKB = calculateJSONSize(jsonString);
    // console.log("Dung lượng của đối tượng JSON là: " + sizeInKB + " KB");
    saveJSONToFile(jsonString, filePath);
    const ex = {
      employees: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
        },
        {
          firstName: "David",
          lastName: "Johnson",
          email: "david.johnson@example.com",
        },
      ],
    };
    try {
      let options = {
        mode: "json",
        pythonPath: "python",
        pythonOptions: ["-u"], // unbuffered binary stdout and stderr
        scriptPath: "../server/src/services",
        args: [ex],
      };

      // PythonShell.run(pythonScript, options, function (err, result) {
      //   if (err) {
      //     console.log(err);
      //     reject(err);
      //   } else {
      //     console.log(result);
      //     const response = result;
      //   }
      //   resolve({
      //     error: response ? 0 : 1,
      //     msg: response ? "OK" : "Get id species fail.",
      //     response,
      //   });
      // });

      let results = await PythonShell.run(pythonScript, options).then(
        (results) => {
          // results is an array consisting of messages collected during execution
          // console.log("results: %j", results);
          return results;
        }
      );

      resolve({
        error: results ? 0 : 1,
        msg: results ? "OK" : "Get id species fail.",
        results,
      });
    } catch (error) {
      reject(error);
    }
  });
function calculateJSONSize(obj) {
  const jsonString = JSON.stringify(obj);
  const bytes = new Blob([jsonString]).size;
  const kilobytes = bytes / 1024;
  return kilobytes; // Trả về kích thước dữ liệu JSON tính bằng kilobytes
}

export const HierarchicalService = (data) =>
  new Promise(async (resolve, reject) => {
    let jsonString = JSON.stringify(data);
    // const sizeInKB = calculateJSONSize(jsonString);
    // console.log("Dung lượng của đối tượng JSON là: " + sizeInKB + " KB");
    saveJSONToFile(jsonString, filePath);
    const ex = {
      employees: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
        },
        {
          firstName: "David",
          lastName: "Johnson",
          email: "david.johnson@example.com",
        },
      ],
    };
    // console.log(jsonString);
    try {
      let options = {
        mode: "json",
        pythonPath: "python",
        pythonOptions: ["-u"], // unbuffered binary stdout and stderr
        scriptPath: "../server/src/services",
        args: [ex],
      };

      let results = await PythonShell.run("hierarchical.py", options).then(
        (results) => {
          // console.log("results: %j", results);
          return results;
        }
      );

      resolve({
        error: results ? 0 : 1,
        msg: results ? "OK" : "Get id species fail.",
        results,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
// const { spawn } = require("child_process");
// export const KmeansService = (data) =>
//   new Promise(async (resolve, reject) => {
//     // console.log(data[1])
//     try {
//       const pythonProcess = spawn("python3", ["kmeans.py", data]);

//       let result = "";

//       pythonProcess.stdout.on("data", (data) => {
//         result += data.toString();
//       });
//       console.log(result);
//       pythonProcess.on("close", (code) => {
//         if (code !== 0) {
//           reject(`Quy trình Python đã kết thúc với mã trạng thái ${code}`);
//           return;
//         }
//         resolve(result);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
