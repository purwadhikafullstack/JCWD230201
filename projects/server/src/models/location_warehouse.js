'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location_warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.location_product,{
        foreignKey:'location_warehouse_id'
      }),
      this.belongsTo(models.admin,{
        foreignKey:'admin_id'
      })
    }
  }
  location_warehouse.init({
    city: DataTypes.STRING,
    subdistrict:DataTypes.STRING,
    province:DataTypes.STRING,
    latitude:DataTypes.INTEGER,
    longitude:DataTypes.INTEGER,
    createdAt:{
      type:DataTypes.DATE,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
      type:DataTypes.DATE,
      defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'location_warehouse',
  });
  return location_warehouse;
};