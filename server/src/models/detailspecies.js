'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailSpecies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       console.log(models,'-=====')
       DetailSpecies.belongsTo(models.Species);
       DetailSpecies.belongsTo(models.Properties, { foreignKey: 'propertiesId',targetKey: 'id'});
      // DetailSpecies.belongsTo(models.Species, { foreignKey: 'species_id' ,targetKey: 'id', as: 'species'});
      // DetailSpecies.belongsTo(models.Property, { foreignKey: 'properties_id',targetKey: 'id', as: 'property' });
      DetailSpecies.belongsTo(models.PropertiesValue, { foreignKey: 'propertiesvalueId' ,targetKey: 'id'});

    }
  }
  DetailSpecies.init({
    speciesId: DataTypes.INTEGER,
    propertiesId: DataTypes.STRING,
    propertiesvalueId: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'DetailSpecies',
  });
  return DetailSpecies;
};