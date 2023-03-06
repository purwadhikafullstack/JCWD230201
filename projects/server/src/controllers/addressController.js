//import sequelize 
const {sequelize} = require('./../models')
const { Op } = require('sequelize')
const {v4:uuidv4} = require('uuid');
const { QueryTypes } = require('sequelize');

const db = require('./../models/index')

module.exports= {
    getAllAddress: async(req,res)=>{
        try {
            let getData = req.dataToken
            console.log(getData);
            let data = await db.user_address.findAll({
                where:{
                    user_id: getData.id
                },
                include :{
                    model: db.user
                }
            })
            console.log(data);
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
            let {receiver_name, user_address,value, province, city, city_id, subdistrict, phone_number} = req.body
            let getData = req.dataToken
            let data = await db.user_address.create({receiver_name,value, user_address, province, city, city_id, subdistrict, phone_number, user_id: getData.id})
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
    },
}