import db from "../models";
const { Sequelize, DataTypes } = require("sequelize");
import { Op } from "sequelize";
import { v4 } from "uuid";

export const createGenusService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const species = await db.Genus.findOne({
        where: { name_vn: data.name_vn },
        raw: false,
      });
      if (species) {
        resolve({
          err: 1,
          msg: "Loại giống đã tồn tại",
        });
      }

      const properNew = await db.Genus.build({
        name_vn: data?.name_vn,
        name_en: data?.name_en,
      });
      await properNew.save();

      resolve({
        err: 0,
        msg: "Created is successfully !",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllGenusService = () =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(id);
      const respone = await db.Genus.findAll({});

      resolve({
        error: respone ? 0 : 1,
        msg: respone ? "OK" : "Get data fail.",
        respone,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteGenusService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataDelete = await db.Genus.findOne({
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

export const updateGenusService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const dataUpdate = await db.Genus.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (!dataUpdate) {
        resolve({
          err: 1,
          msg: "The data is not defined",
        });
      }
      (dataUpdate.name_vn = data?.name_vn),
        (dataUpdate.name_en = data?.name_en),
        await dataUpdate.save();
      resolve({
        err: 0,
        msg: "updated SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
