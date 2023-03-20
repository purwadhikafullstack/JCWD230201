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
Router.patch('/update', transactionController.updateOrder)
Router.get('/getDataTransaction', tokenVerify, transactionController.getDataTransaction)
Router.get('/allTransactionUser', tokenVerify, transactionController.allTransactionUser)
Router.get('/detailTransaction/:id',transactionController.detailTransactionUser)


module.exports = Router