// define tools express and router
const express = require('express')
const Router = express.Router()

//import all controller
const { userController } = require('./../controllers')
const { tokenVerify } = require('../middleware/verifyToken')
const upload = require('../middleware/upload')


//path nya
Router.post('/register', userController.register)
Router.patch('/activation/:id', userController.activation)
Router.get('/getStatus/:id', userController.getStatusUser)
Router.post('/login', userController.userLogin)
Router.post('/confirm-email', userController.confirmEmail)
Router.patch('/reset-password/:id', userController.resetPassword)
Router.get('/keep-login', tokenVerify, userController.keep_login)
Router.post('/update-photo_profile', upload, tokenVerify, userController.updatePhotoProfile)
Router.patch('/update-data_profile', tokenVerify, userController.updateDataProfile)

//
module.exports = Router