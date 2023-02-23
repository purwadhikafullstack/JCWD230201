// define tools express and router
const express = require('express')
const Router = express.Router()

//import all controller
const { userController } = require('./../controllers')


//path nya
Router.post('/register', userController.register)
Router.patch('/activation/:id', userController.activation)

//
module.exports = Router