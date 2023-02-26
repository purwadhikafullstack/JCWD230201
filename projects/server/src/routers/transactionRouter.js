const express = require('express')
const Router = express.Router()

// Import All Controller
const {transactionController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/getAllTransaction', transactionController.allTransaction)
Router.post('/getTransactionWH' , transactionController.transactionWH)


module.exports = Router