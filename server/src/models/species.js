"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Species.hasMany(models.DetailSpecies, { foreignKey: 'species_id', as: 'species' });
      Species.hasMany(sequelize.define("DetailSpecies"));
      Species.hasMany(sequelize.define("Distribution"));
      Species.hasMany(sequelize.define("DetailImages"));
      Species.hasMany(sequelize.define("AddSpecies"));
      // Species.belongsToMany(models.Properties, {through: 'DetailSpecies'});
    }
  }
  Species.init(
    {
      name: DataTypes.STRING,
      name_other: DataTypes.STRING,
      origin_vn: DataTypes.STRING,
      origin_en: DataTypes.STRING,
      // provinceId: DataTypes.INTEGER,
      approve: DataTypes.BOOLEAN,
      genusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Species",
    }
  );
  return Species;
};
