'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaction,{
        foreignKey:'user_id'
      }),
      this.hasMany(models.cart,{
        foreignKey:'user_id'
      }),
      this.hasMany(models.user_address,{
        foreignKey:'user_id'
      })
    }
  }
  user.init({
    id:{
      allowNull:false,
      autoIncrement:false,
      primaryKey:true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    photo_profile: DataTypes.STRING,
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
    modelName: 'user',
  });
  return user;
};