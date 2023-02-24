const express = require('express')
const Router = express.Router()

// Import All Controller
const {productController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/', productController.getAllProducts)
Router.get('/productdetail/:id', productController.getProductDetails)
Router.get('/category', productController.getCategory)
Router.get('/:category_id', productController.getProduct)
Router.get('/:product_id/:color/:memory_storage', productController.getSelected)


module.exports = Router