'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PropertiesValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // PropertiesValue.hasMany(models.DetailSpecies, { foreignKey: 'propertiesId' });
      PropertiesValue.hasMany(sequelize.define('DetailSpecies'));
      PropertiesValue.belongsTo(models.Properties,{ foreignKey: 'propertiesId', targetKey: 'id' });
    }
  }
  PropertiesValue.init({
    propertiesId: DataTypes.STRING,
    option: DataTypes.INTEGER,
    description: DataTypes.STRING,
    description_en: DataTypes.STRING,
    // value: DataTypes.FLOAT,
    // email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PropertiesValue',
  });
  return PropertiesValue;
};