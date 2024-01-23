"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TypeProperty.hasMany(models.DetailSpecies, { foreignKey: 'TypeProperty_id' });
        TypeProperty.hasMany(sequelize.define("Properties"));
      // TypeProperty.belongsToMany(models.Species, {through: 'DetailSpecies'});
    }
  }
  TypeProperty.init(
    {
      name_vn: DataTypes.STRING,
      name_en: DataTypes.STRING,
      // email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "TypeProperty",
    }
  );
  return TypeProperty;
};
