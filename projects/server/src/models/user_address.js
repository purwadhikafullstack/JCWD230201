'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{
        foreignKey:'user_id'
      })
    }
  }
  user_address.init({
    user_address: DataTypes.STRING,
    value:DataTypes.INTEGER,
    subdistrict: DataTypes.STRING,
    city:DataTypes.STRING,
    province: DataTypes.STRING,
    latitude:DataTypes.INTEGER,
    longitude:DataTypes.INTEGER,
    receiver_name:DataTypes.STRING,
    phone_number:DataTypes.INTEGER,
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
    modelName: 'user_address',
  });
  return user_address;
};