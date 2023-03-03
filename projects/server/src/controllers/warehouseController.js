//import sequelize
const { sequelize } = require('../models')
const { Op } = require('sequelize')

const db = require('../models/index')

module.exports = {
    getDataWH:async(req,res)=>{

        let getWH = await db.location_warehouse.findAll()

        res.status(201).send({
            isError:false,
            message:'get data success',
            data:getWH
        })
    },
    addWH:async(req,res)=>{
        let {province, city, subdistrict,address} = req.body
        
        let dataWH = await db.location_warehouse.create({
            province, city, subdistrict,address
        })
        res.status(201).send({
            isError:false,
            message:'Create Data WH Success!',
            data:dataWH
        })
    }

    
}