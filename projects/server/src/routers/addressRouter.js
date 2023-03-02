const express = require('express')
const Router = express.Router()

// Import All Controller
const {addressController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/:user_id', addressController.getAllAddress)
Router.post('/add-address/:user_id', addressController.postAddress)


module.exports = Router