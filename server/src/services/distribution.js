import db from "../models";
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createDistributionService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataNew = await db.Distribution.build({
        speciesId: data?.speciesId,
        provineceId: data?.provineceId,
      });
      await dataNew.save();
      resolve({
        err: 0,
        msg: "Created is successfully !",
      });
    } catch (error) {
      reject(error);
    }
  });

export const AddArea = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const speciesId = data.selection;
      const province = data.checkbox;
      const distributionPromises = [];

      province.forEach(async (provinceId) => {
        const existingDistribution = await db.Distribution.findOne({
          where: {
            speciesId: speciesId,
            provineceId: provinceId,
          },
        });

        if (!existingDistribution) {
          distributionPromises.push(
            db.Distribution.create({
              speciesId: speciesId,
              provineceId: provinceId,
            })
          );
        }
      });

      await Promise.all(distributionPromises);

      resolve({
        err: 0,
        msg: "Distributions created successfully!",
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateDistributionService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataUpdate = await db.Distribution.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!dataUpdate) {
        resolve({
          err: 1,
          msg: "The data is not defined",
        });
      }
      (dataUpdate.speciesId = data?.speciesId),
        (dataUpdate.provineceId = data?.provineceId),
        await dataUpdate.save();
      resolve({
        err: 0,
        msg: "updated SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });

export const deleteDistributionService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataDelete = await db.Distribution.findOne({
        where: { id: id },
      });
      if (!dataDelete) {
        resolve({
          err: 2,
          msg: "data is not defined",
        });
      }

      await dataDelete.destroy();

      resolve({
        err: 0,
        msg: "deleted SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });

export const getAllDistributionService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      const respone = await db.Distribution.findAndCountAll({
        where: { speciesId: id },
        // raw: true,
        // nest: true,
        include: [{ model: db.Provinece }],
        // attributes: ['id']
      });
      // console.log(respone)
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get data fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getDistributionService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await db.Distribution.findAll({
        attributes: [
          "provineceId",
          [Sequelize.fn("count", Sequelize.col("speciesId")), "cnt"],
        ],
        group: ["provineceId"],
      });
      // console.log(respone)
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get data fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllProvinceService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const respone = await db.Provinece.findAll({});
      // console.log(respone)
      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get data fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });
