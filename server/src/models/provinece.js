"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provinece extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provinece.hasMany(sequelize.define("Distribution"));
    }
  }
  Provinece.init(
    {
      name: DataTypes.STRING,
      name_en: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longtitude: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Provinece",
    }
  );
  return Provinece;
};
