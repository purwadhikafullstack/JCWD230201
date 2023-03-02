const express = require('express')
const Router = express.Router()

// Import All Controller
const {rajaongkirController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/province', rajaongkirController.getProvince)
Router.get('/city', rajaongkirController.getCity)



module.exports = Router