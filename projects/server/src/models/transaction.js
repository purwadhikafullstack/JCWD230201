'use strict';

var moment = require('moment'); // require

const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
      this.belongsTo(models.user,{
        foreignKey:'user_id'
      }),
      this.belongsTo(models.order_status,{
        foreignKey:'order_status_id'
      }),
      this.hasMany(models.transaction_detail,{
        foreignKey:'transaction_id'
      }),
      this.hasMany(models.status_transaction_log,{
        foreignKey:'transaction_id'
      })
    }
  }
  transaction.init({
    ongkir: DataTypes.INTEGER,
    receiver:DataTypes.STRING,
    address:DataTypes.STRING,
    status_transaction:{
      type: DataTypes.STRING,
      defaultValue: 'Menunggu Pembayaran'
    },
    exprired:{
      type:DataTypes.DATE,
      defaultValue : moment().add(1, 'hours').toDate()
    },
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
    modelName: 'transaction',
  });
  return transaction;
};