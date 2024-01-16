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
      DetailImages.belongsTo(models.Properties, {
        foreignKey: "propertiesId",
        targetKey: "id",
      });
      // DetailImages.belongsTo(models.Species, { foreignKey: 'species_id' ,targetKey: 'id', as: 'species'});
      // DetailImages.belongsTo(models.Property, { foreignKey: 'properties_id',targetKey: 'id', as: 'property' });
      DetailImages.belongsTo(models.PropertiesValue, {
        foreignKey: "propertiesvalueId",
        targetKey: "id",
      });
    }
  }
  DetailImages.init(
    {
      speciesId: DataTypes.INTEGER,
      propertiesId: DataTypes.STRING,
      propertiesvalueId: DataTypes.INTEGER,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "DetailImages",
    }
  );
  return DetailImages;
};
