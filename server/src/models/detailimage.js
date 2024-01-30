"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log(models, "-=====");
      DetailImages.belongsTo(models.Species);
      DetailImages.belongsTo(models.Image, {
        foreignKey: "imageId",
        targetKey: "id",
      });
      
    }
  }
  DetailImages.init(
    {
      speciesId: DataTypes.INTEGER,
      imageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailImages",
    }
  );
  return DetailImages;
};
