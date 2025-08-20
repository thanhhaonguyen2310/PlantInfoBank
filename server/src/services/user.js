import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = (payload) =>
  new Promise(async (resolve, reject) => {
    console.log(payload);
    try {
      // Validate required fields
      if (!payload.phone || !payload.password || !payload.name) {
        resolve({
          err: 1,
          msg: "Phone, password and name are required!",
          token: null,
          response: null,
        });
        return;
      }

      const response = await db.User.findOrCreate({
        where: { phone: payload.phone },
        defaults: {
          phone: payload.phone,
          name: payload.name,
          password: hashPassword(payload.password),
          address: payload.address || null,
          gender: payload.gender || null,
          power: payload.power || false,
          // Remove manually setting id, let Sequelize handle it
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.JWT_SECRET,
          { expiresIn: "365d" }
        );
      
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is successfully !"
          : "Phone number has been already used !",
        token: token || null,
        response: response[1] ? response[0] : null,
      });
    } catch (error) {
      console.error("Register error:", error);
      reject(error);
    }
  });

export const loginService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      // Validate required fields
      if (!data.phone || !data.password) {
        resolve({
          err: 1,
          msg: "Phone and password are required!",
          token: null,
          response: null,
        });
        return;
      }

      const response = await db.User.findOne({
        where: { phone: data.phone },
        raw: true,
      });
      
      const isCorrectPassword =
        response && bcrypt.compareSync(data.password, response.password);
      
      console.log("Login attempt for phone:", data.phone);
      console.log("Password correct:", isCorrectPassword);
      
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.JWT_SECRET,
          { expiresIn: "365d" }
        );
        
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "Phone number not found !",
        token: token || null,
        response: token ? response : null,
      });
    } catch (error) {
      console.error("Login error:", error);
      reject(error);
    }
  });

export const updateUserService = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          err: 1,
          msg: "User ID is required",
        });
        return;
      }
      
      console.log("Updating user:", data);
      
      const checkUser = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      
      if (!checkUser) {
        resolve({
          err: 1,
          msg: "The user is not found",
        });
        return;
      }

      // Update fields only if provided
      if (data.name !== undefined) checkUser.name = data.name;
      if (data.address !== undefined) checkUser.address = data.address;
      if (data.phone !== undefined) checkUser.phone = data.phone;
      if (data.gender !== undefined) checkUser.gender = data.gender;
      if (data.password) checkUser.password = hashPassword(data.password);

      await checkUser.save();
      
      resolve({
        err: 0,
        msg: "User updated successfully",
      });
    } catch (error) {
      console.error("Update user error:", error);
      reject(error);
    }
  });
export const deleteUserService = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          err: 1,
          msg: "User ID is required",
        });
        return;
      }

      const user = await db.User.findOne({
        where: { id: userId },
      });
      
      if (!user) {
        resolve({
          err: 2,
          msg: "The user is not found",
        });
        return;
      }

      await user.destroy();

      resolve({
        err: 0,
        msg: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      reject(error);
    }
  });

export const getAllUserService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        where: { 
          power: { [db.Sequelize.Op.or]: [false, null] } 
        },
        raw: true,
        nest: true,
        attributes: { exclude: ['password'] }, // Exclude password from response
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get users failed.",
        response,
      });
    } catch (error) {
      console.error("Get all users error:", error);
      reject(error);
    }
  });

export const getUserCurrentService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          err: 1,
          msg: "User ID is required",
          response: null,
        });
        return;
      }

      const response = await db.User.findOne({
        where: { id },
        raw: true,
        nest: true,
        attributes: { exclude: ['password'] }, // Exclude password from response
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get user failed.",
        response,
      });
    } catch (error) {
      console.error("Get current user error:", error);
      reject(error);
    }
  });

  export const getGenusService = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          err: 1,
          msg: "Genus name is required",
          response: null,
        });
        return;
      }

      const response = await db.Genus.findOne({
        where: { name_vn: name },
        raw: true,
        nest: true
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Get genus failed.",
        response,
      });
    } catch (error) {
      console.error("Get genus error:", error);
      reject(error);
    }
  });