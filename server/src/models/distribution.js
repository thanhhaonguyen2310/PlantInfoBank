"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Distribution.belongsTo(models.Species, {
        foreignKey: "speciesId",
        targetKey: "id",
      });
      Distribution.belongsTo(models.Provinece, {
        foreignKey: "provineceId",
        targetKey: "id",
      });
    }
  }
  Distribution.init(
    {
      speciesId: DataTypes.INTEGER,
      provineceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Distribution",
    }
  );
  return Distribution;
};
