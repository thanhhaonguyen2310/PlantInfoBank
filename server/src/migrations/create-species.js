"use strict";
/** @type {import('sequelize-cli').Migration} */
/**
 * name: DataTypes.STRING,
    name_other: DataTypes.STRING,
    origin_vn: DataTypes.STRING,
    origin_en: DataTypes.STRING,
    language: DataTypes.STRING,
    province_id: DataTypes.STRING,   
    flowering_day: DataTypes.DATE,
    replanting : DataTypes.DATE,
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Species", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      name_other: {
        type: Sequelize.STRING,
      },
      origin_vn: {
        type: Sequelize.STRING,
      },
      origin_en: {
        type: Sequelize.STRING,
      },

      approve: {
        // type: Sequelize.STRING,
        type: Sequelize.BOOLEAN,
      },
      genusId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Species");
  },
};
