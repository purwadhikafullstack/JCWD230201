//import sequelize 
const {sequelize} = require('./../models')
const { Op } = require('sequelize')
const {v4:uuidv4} = require('uuid');
const { QueryTypes } = require('sequelize');

const db = require('./../models/index')

module.exports= {
    getAllAddress: async(req,res)=>{
        try {
            let {user_id} = req.params
            let data = await db.user_address.findAll({
                where:{
                    user_id
                },
                include :{
                    model: db.user
                }
            })
            res.status(200).send({
                isError: false,
                message: "Get All Address Success",
                data,
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: error.message,
                data: error
            })
        }
    },
    postAddress: async(req, res)=>{
        try {
            let {receiver_name, user_address, province, city, subdistrict, phone_number} = req.body
            let {user_id} = req.params
            let data = await db.user_address.create({receiver_name, user_address, province, city, subdistrict, phone_number, user_id})
            res.status(200).send({
                isError: false,
                message: "Post Address Success",
                data,
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