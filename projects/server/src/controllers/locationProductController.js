//import sequelize 
const {sequelize} = require('./../models')
const { Op } = require('sequelize')
const {v4:uuidv4} = require('uuid');
const { QueryTypes } = require('sequelize');

const db = require('./../models/index')
// Import Delete Files
const deleteFiles = require('./../helpers/deleteFiles')

module.exports= {
    getLocation: async(req, res)=>{
        try {
            let data = await db.location_warehouse.findAll({})
            res.status(200).send({
                isError: false,
                message: "Get Location Success",
                data
            })
        } catch (error) {
            res.status(400).send({
                isError: false,
                message: error.message,
                data: null
            })
        }
    },
    getLocationProduct: async(req, res)=>{
        try {
            let {location_warehouse_id} = req.params
            let {page} = req.query
            console.log(page);
            let data = await db.location_product.findAll({
                where:{
                    location_warehouse_id
                },include:{
                    model: db.product_detail,include:{
                        model: db.product
                    }
                }
            })
            var limit = 10
            var pages = Math.ceil(data.length / limit)
            var offset = limit * (Number(page) - 1)

            let data1 = await db.location_product.findAll({
                where:{
                    location_warehouse_id
                },include:{
                    model: db.product_detail,include:{
                        model: db.product
                    }
                },
                offset,
                limit
            })

            console.log(data1[0].dataValues.location_warehouse_id);
            let response = await db.location_warehouse.findAll({
                where:{
                    id: data1[0].dataValues.location_warehouse_id
                }
            })
            res.status(200).send({
                isError: false,
                message: "Get Location Product Success",
                response: response,
                data: data1, 
                total: data.length, 
                page: Number(page),
                pages: pages
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    getQuantity: async(req, res)=>{
        try {
            let {id} = req.body
            let data = await db.location_product.findOne({
                where:{
                    id
                }
            })
            res.status(200).send({
                isError: false,
                message: "Get Quantity Success",
                data
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    updateStock: async(req, res)=>{
        try {
            let {id, qty} = req.body
            await db.location_product.update({qty},{
                where:{
                    id
                }
            })
            res.status(200).send({
                isError: false,
                message: "Update Stock Success",
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    postStock: async(req, res)=>{
        try {
            let {qty, status, location_warehouse_id, product_detail_id} = req.body
            let data = await db.log_stock.create({qty, status, location_warehouse_id, product_detail_id})
            res.status(200).send({
                isError: false,
                message: "Post Stock Success",
                data
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    }
}