"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AddSpecies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log(models, "-=====");
      AddSpecies.belongsTo(models.Species);
      AddSpecies.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
      
    }
  }
  AddSpecies.init(
    {
      speciesId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AddSpecies",
    }
  );
  return AddSpecies;
};
