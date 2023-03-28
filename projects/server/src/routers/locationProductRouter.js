const express = require('express')
const Router = express.Router()

// Import All Controller
const {locationProductController} = require('../controllers') // Akan otomatis mengambil file index.js nya
// const upload = require('../middleware/upload')

Router.get('/', locationProductController.getLocation)
Router.get('/location-product/:location_warehouse_id', locationProductController.getLocationProduct)
Router.post('/quantity', locationProductController.getQuantity)
Router.patch('/update', locationProductController.updateStock)
Router.post('/stock', locationProductController.postStock)


module.exports = Router