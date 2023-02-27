//define router
const adminController = require('./adminController'), transactionController= require('./transactionController')
const productController = require('./productController')
const userController = require('./userController')

//export it

module.exports={
    adminController,
    productController,
    userController,
    transactionController

}