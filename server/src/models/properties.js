"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Properties.hasMany(sequelize.define("DetailSpecies"));
      Properties.belongsTo(models.TypeProperty, {
        foreignKey: "typepropertyId",
        targetKey: "id",
      });
      // Properties.belongsToMany(models.Species, {through: 'DetailSpecies'});
    }
  }
  Properties.init(
    {
      name_vn: DataTypes.STRING,
      name_en: DataTypes.STRING,
      typepropertyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Properties",
    }
  );
  return Properties;
};
