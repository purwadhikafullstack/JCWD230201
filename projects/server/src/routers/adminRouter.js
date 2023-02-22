// define tools express and router
const express = require('express')
const Router = express.Router()

// import all controller
const {adminController} = require('./../controllers')


// path nya
Router.post('/login', adminController.adminLogin)
Router.post('/register', adminController.register)
Router.get('/getAdmin', adminController.getAllAdmin)

//
module.exports = Router