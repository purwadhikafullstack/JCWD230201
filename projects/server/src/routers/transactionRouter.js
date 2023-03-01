const express = require('express')
const Router = express.Router()

// Import All Controller
const {transactionController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.post('/getAllTransaction', transactionController.allTransaction)
Router.post('/getTransactionWH' , transactionController.transactionWH)
Router.post('/filter', transactionController.filter)
Router.post('/FWarehouse', transactionController.filterWH)


module.exports = Router