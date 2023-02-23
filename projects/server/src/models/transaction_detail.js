'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaction,{
        foreignKey:'transaction_id'
      })
    }
  }
  transaction_detail.init({
    product_name:DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
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
    modelName: 'transaction_detail',
  });
  return transaction_detail;
};