const express = require('express')
const Router = express.Router()

// Import All Controller
const { transactionController } = require('../controllers') // Akan otomatis mengambil file index.js nya
const { tokenVerify } = require('../middleware/verifyToken')

Router.post('/getAllTransaction', transactionController.allTransaction)
Router.post('/getTransactionWH', transactionController.transactionWH)
Router.post('/filter', transactionController.filter)
Router.post('/FWarehouse', transactionController.filterWH)
Router.get('/getSales', transactionController.getSales)
Router.post('/createOrder', transactionController.CreateOrder)
Router.get('/getDataTransaction', tokenVerify, transactionController.getDataTransaction)


module.exports = Router