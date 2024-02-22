"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Genus.hasMany(models.DetailSpecies, { foreignKey: 'Genus_id' });
      //   Genus.hasMany(sequelize.define("DetailSpecies"));
      // Genus.belongsToMany(models.Species, {through: 'DetailSpecies'});
    }
  }
  Genus.init(
    {
      name_vn: DataTypes.STRING,
      name_en: DataTypes.STRING,
      // email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Genus",
      tableName: "genus",
      name: {
        singular: "Genus",
        plural: "Genus",
      },
    }
  );
  return Genus;
};
