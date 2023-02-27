//import sequelize
const {sequelize} = require('../models')
const { Op } = require('sequelize')

const db = require('../models/index')

module.exports= {
    allTransaction:async(req,res)=>{
        
        let response = await db.transaction.findAll({
            include:[
               { model: db.location_warehouse},
               {model:db.transaction_detail},
               {model:db.order_status}
        ]
        })

        res.status(201).send({
            isError:false,
            message:'get data transaction success!',
            data: response
        })
    },
    transactionWH:async(req,res)=>{
    //     let {city} = req.body

    //    let response = await db.transaction.findAll({
    //     where:{
    //         warehouse_city:city
    //     }
    //    })

       //or you can use this?
       let {id} = req.body
       let response = await db.transaction.findAll({
            where:{
                location_warehouse_id:id
            }
       })
    res.status(201).send({
        isError:false,
        message:'get data transaction success!',
        data: response
    })
    }
}