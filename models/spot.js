'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Spot.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Spot.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    opening_hours: DataTypes.STRING,
    closed_hours: DataTypes.STRING,
    description: DataTypes.STRING(1000)
  }, {
    sequelize,
    modelName: 'Spot',
    tableName: 'Spots',
    underscored: true
  })
  return Spot
}
