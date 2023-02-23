// define tools express and router
const express = require('express')
const Router = express.Router()

// import all controller
const {adminController} = require('./../controllers')
const {tokenVerify} = require('../middleware/verifyToken')


// path nya
Router.post('/login', adminController.adminLogin)
// Router.post('/register', adminController.register) buat inject super admin
Router.get('/getAdmin', adminController.getAllAdmin)
Router.get('/keep-login', tokenVerify, adminController.keep_login)

//
module.exports = Router