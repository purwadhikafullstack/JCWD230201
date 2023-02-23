//import sequelize 
const {sequelize} = require('./../models')
const { Op } = require('sequelize')
const {v4:uuidv4} = require('uuid');
const { QueryTypes } = require('sequelize');

const db = require('./../models/index')

module.exports= {
    getAllProducts: async(req, res) => {
        try {
            let {name} = req.query
            let data = await db.category.findAll({
                where: {
                    name
                },
                include :{
                    model: db.product, include:{
                        model: db.product_detail
                    }
                }
            })
            res.status(201).send({
                isError: false,
                message: "Get All Products Success",
                data,
            })
        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    getProduct: async(req, res) => {
        try {
            let {category_id} = req.params
            // console.log(name);
            let data = await db.product.findAll({
                where: {
                    category_id
                },
                include:[{
                        model: db.product_detail
                    },
                {model: db.product_image}]
            })
            res.status(201).send({
                isError: false,
                message: "Get Product Success",
                data
            })
        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    getProductDetails: async(req, res) => {
        try {
            let {id} = req.params
            let data = await db.product.findAll({
                where: {
                    id
                },
                include:[{
                    model: db.product_detail
                },
            {model: db.product_image}]
            })
            res.status(200).send({
                isError: false,
                message: "Get Product Details Success",
                data
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    getCategory: async(req,res)=>{
        try {
            let data = await db.category.findAll({
                include:{
                    model: db.product
                }
            })
            res.status(201).send({
                isError: false,
                message: "Get Product Category Success",
                data
            })
        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    getSelected: async(req, res) =>{
        try {
            let {product_id, color, memory_storage} = req.params
            let data = await sequelize.query(
                'SELECT * FROM product_details WHERE (product_id = ? AND (color = ? AND memory_storage = ?))',
                {
                  replacements: [product_id, color, memory_storage],
                  type: QueryTypes.SELECT
                }
              );
            res.status(200).send({
                isError: false,
                message: "Get Selected Product Success",
                data
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    }
}