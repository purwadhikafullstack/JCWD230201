// define tools express and router
const express = require('express')
const Router = express.Router()

//import all controller
const { warehouseController } = require('./../controllers')


//path nya
Router.get('/getwh', warehouseController.getDataWH)
Router.post('/addWH', warehouseController.addWH)

//
module.exports = Router