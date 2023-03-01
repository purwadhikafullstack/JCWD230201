//import sequelize
const { sequelize } = require('../models')
const { Op } = require('sequelize')

const db = require('../models/index')

module.exports = {
    allTransaction: async (req, res) => {
        let {warehouse} = req.body
        
        let response = warehouse? await db.transaction.findAll({
            
            where:{warehouse_city: warehouse},
            include: [
                { model: db.location_warehouse },
                { model: db.transaction_detail },
                { model: db.order_status },
            ]
        })
        :
        await db.transaction.findAll({
            include: [
                { model: db.location_warehouse },
                { model: db.transaction_detail },
                { model: db.order_status },
            ]
        })

        res.status(201).send({
            isError: false,
            message: 'get data transaction success!',
            data: response
        })
    },
    transactionWH: async (req, res) => {
        //     let {city} = req.body

        //    let response = await db.transaction.findAll({
        //     where:{
        //         warehouse_city:city
        //     }
        //    })

        //or you can use this?
        let { id } = req.body
        let response = await db.transaction.findAll({
            where: {
                location_warehouse_id: id
            }
        })
        res.status(201).send({
            isError: false,
            message: 'get data transaction success!',
            data: response
        })
    },
    filterWH: async (req, res) => {
        try {

            let { warehouse_city } = req.body

            let getData = await db.transaction.findAll({
                where: {
                    warehouse_city
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status },
                ]
            })

            if(!getData) throw {message:'Data Not Found!'}

            res.status(201).send({
                isError: false,
                message:'get data success!',
                data: getData
            })
        } catch (error) {
            res.status(404).send({
                isError:true,
                message:error.message,
                data:null
            })
        }
    },
    filter:async(req,res)=>{
        try {
            let {data} = req.body
            
                let getData = data=="Warehouse"? await db.location_warehouse.findAll() : null
                console.log(getData)
            
            res.status(201).send({
                isError:false,
                message:'get data success!',
                data:getData
            })
        } catch (error) {
            console.log(error)
        }

        
    }
}