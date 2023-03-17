//import sequelize
const { sequelize } = require('../models')
const { Op } = require('sequelize')

const db = require('../models/index')
const moment = require('moment')
module.exports = {
    allTransaction: async (req, res) => {
        let { warehouse, order_status_id } = req.body

        if (order_status_id == undefined) {
            var response = warehouse ? await db.transaction.findAll({
                where: { warehouse_city: warehouse },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            })
                :
                await db.transaction.findAll({
                    include: [
                        { model: db.location_warehouse },
                        { model: db.transaction_detail },
                        { model: db.order_status }
                    ]
                })
        } else {
            var response = warehouse ? await db.transaction.findAll({
                where: { warehouse_city: warehouse, order_status_id },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            })
                :
                await db.transaction.findAll({
                    where: { order_status_id },
                    include: [
                        { model: db.location_warehouse },
                        { model: db.transaction_detail },
                        { model: db.order_status }
                    ]
                })
        }

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

            let { warehouse_city, order_status_id } = req.body

            let getData = order_status_id ? await db.transaction.findAll({
                where: {
                    warehouse_city, order_status_id
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status },
                ]
            }) : await db.transaction.findAll({
                where: {
                    warehouse_city
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status },
                ]
            })

            if (!getData) throw { message: 'Data Not Found!' }

            res.status(201).send({
                isError: false,
                message: 'get data success!',
                data: getData
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    filter: async (req, res) => {
        try {
            let { data } = req.body

            let getData = data == "Warehouse" ? await db.location_warehouse.findAll() : null
            console.log(getData)

            res.status(201).send({
                isError: false,
                message: 'get data success!',
                data: getData
            })
        } catch (error) {
            console.log(error)
        }
    },
    getSales: async (req, res) => {
        let { start, end, type, WH } = req.query
        console.log(`ini warehouse ${WH}`)

        var total_transactionS = await db.transaction.findAll({
            where: {
                order_status_id: 5
            }
        })

        var total_transactionC = await db.transaction.findAll({
            where: {
                order_status_id: 6
            }
        })

        if (type == 1) {
            var response = WH == 0 ? await db.transaction.findAll({
                where: {
                    [Op.and]: [
                        {
                            updatedAt: {
                                [Op.gte]: start,
                                [Op.lt]: end
                            }
                        },
                        {
                            order_status_id: 5
                        }

                    ]

                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            }) : await db.transaction.findAll({
                where: {
                    [Op.and]: [
                        {
                            updatedAt: {
                                [Op.gte]: start,
                                [Op.lt]: end
                            }
                        },
                        {
                            order_status_id: 5
                        },
                        {
                            location_warehouse_id: WH
                        }
                    ]
                },
                include: [
                    { model: db.location_warehouse },
                    { model: db.transaction_detail },
                    { model: db.order_status }
                ]
            })

            var users = await db.user.findAll()
            var usersUV = await db.user.findAll({
                where: {
                    status: 'Unverified'
                }
            })
            var list_WH = WH == 0 ? await db.location_warehouse.findAll() : await db.location_warehouse.findOne({ where: { id: WH } })
            var warehouse = await db.location_warehouse.findAll()
        } else if (type == 2) {
            var response = WH == 0 ? await db.category.findAll({
                include: [
                    {
                        model: db.transaction_detail,
                        include: [
                            {
                                model: db.transaction,
                                where: {
                                    [Op.and]: [
                                        {
                                            updatedAt: {
                                                [Op.gte]: start,
                                                [Op.lt]: end
                                            }
                                        },
                                        {
                                            order_status_id: 5
                                        }
                                    ]

                                }
                            }
                        ]
                    }
                ]
            }) :
                await db.category.findAll({
                    include: [
                        {
                            model: db.transaction_detail,
                            include: [
                                {
                                    model: db.transaction,
                                    where: {
                                        [Op.and]: [
                                            {
                                                updatedAt: {
                                                    [Op.gte]: start,
                                                    [Op.lt]: end
                                                }
                                            },
                                            {
                                                order_status_id: 5
                                            },
                                            {
                                                location_warehouse_id: WH
                                            }
                                        ]

                                    }
                                }
                            ]
                        }
                    ]
                })
        } else if (type == 3) {
            var response = WH == 0 ? await db.transaction_detail.findAll({
                include: [{
                    model: db.transaction,
                    where: {
                        [Op.and]: [
                            {
                                updatedAt: {
                                    [Op.gte]: start,
                                    [Op.lt]: end
                                }
                            },
                            {
                                order_status_id: 5
                            }
                        ]
                    }
                }]
            })
                :
                await db.transaction_detail.findAll({
                    include: [{
                        model: db.transaction,
                        where: {
                            [Op.and]: [
                                {
                                    updatedAt: {
                                        [Op.gte]: start,
                                        [Op.lt]: end
                                    }
                                },
                                {
                                    order_status_id: 5
                                },
                                {
                                    location_warehouse_id: WH
                                }
                            ]
                        }
                    }]
                })

        }
        res.status(201).send({
            isError: false,
            data: response,
            users: users?.length ? users.length : null,
            userUV: usersUV?.length ? usersUV.length : null,
            wh: warehouse?.length ? warehouse.length : null,
            list_wh: list_WH,
            tr_success: total_transactionS?.length ? total_transactionS.length : null,
            tr_cancel: total_transactionC?.length ? total_transactionC.length : null
        })
    },
    CreateOrder: async (req, res) => {
        try {
            // let getToken = req.dataToken
            let { user_id, ongkir, receiver, address, warehouse_city, location_warehouse_id, courier, user_name, phone_number, subdistrict, province, city, upload_payment, cart, user_address_id } = req.body

            let findData = await db.user_address.findOne({
                where: {
                    id: user_address_id
                }
            })
            // console.log(findData)

            let dataWH = await db.location_warehouse.findAll()
            // console.log(dataWH)

            
            let distanceWH = []
            for (let i = 0; i < dataWH.length; i++) {
                let latlongWH = []

                const R = 6371e3; // metres
                const φ1 = parseFloat(findData.dataValues.latitude) * Math.PI / 180; // φ, λ in radians
                const φ2 = parseFloat(dataWH[i].dataValues.latitude) * Math.PI / 180;
                const Δφ = (parseFloat(dataWH[i].dataValues.latitude) - (parseFloat(findData.dataValues.latitude))) * Math.PI / 180;
                const Δλ = (parseFloat(dataWH[i].dataValues.longitude) - parseFloat(findData.dataValues.longitude)) * Math.PI / 180;

                const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                const d = R * c;

                latlongWH.push(dataWH[i].dataValues.city)
                latlongWH.push(d/1000)
                distanceWH.push(latlongWH)
            }
            console.log(distanceWH)

            let closestWH =distanceWH[0][1]
            let cityWH

            for(let i=0;i<distanceWH.length;i++){
                if(distanceWH[i][1]<closestWH){
                    closestWH = distanceWH[i][1]
                    cityWH = distanceWH[i][0]
                }
            }
            // console.log(cityWH,closestWH)

            let findWH = await db.location_warehouse.findOne({
                where:{
                    city:cityWH
                }
            })
            // console.log(findWH)
            
            // console.log(Math.min(...closestWH))


            var kreat = await db.transaction.create({
                user_id, ongkir, receiver, address, warehouse_city:findWH.dataValues.city, location_warehouse_id:findWH.dataValues.id, courier, user_name, phone_number, subdistrict, city, province, upload_payment, order_status_id: 1
            })

            await db.status_transaction_log.create({
                transaction_id: kreat.dataValues.id, order_status_id: 1
            })

            cart.forEach(async (item, index) => {
                await db.transaction_detail.create({
                    transaction_id: kreat.dataValues.id, qty: item.qty, price: item.product_detail.price,
                    product_name: item.product.name, weight: item.product_detail.weight, memory_storage: item.product_detail.memory_storage,
                    color: item.product_detail.color, product_img: item.product.product_images[0].img, category_id: item.product.category_id, product_detail_id: item.product_detail.id,

                })
            })

            res.status(201).send({
                isError: false,
                message: 'data success',
                data: kreat
            })
        } catch (error) {
            console.log(error)
        }
    },
    getDataTransaction:async(req,res)=>{
        try {
            let getToken = req.dataToken
            // console.log(getToken)

            let data = await db.transaction.findOne({
                where:{
                    user_id: getToken.id
                },
                include:[
                    {model:db.order_status},
                    {model:db.transaction_detail}    
                ]
            })

            // console.log(data)
            res.status(201).send({
                isError: false,
                message: 'data success',
                data
            })
        } catch (error) {
            
        }
    }
}