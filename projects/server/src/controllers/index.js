//define router
const adminController = require('./adminController'), transactionController= require('./transactionController')
const productController = require('./productController'), warehouseController = require('./warehouseController')
const userController = require('./userController')
const addressController = require('./addressController')
const rajaongkirController = require('./rajaongkirController')
const cartController = require('./cartController')

//export it

module.exports={
    adminController,
    productController,
    userController,
    transactionController,
    addressController,
    rajaongkirController,
    warehouseController,
    cartController
}