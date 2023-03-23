//import sequelize
const { sequelize } = require('../models')
const { Op } = require('sequelize')

const db = require('../models/index')
const moment = require('moment')

const deleteFiles = require('./../helpers/deleteFiles')
module.exports = {
    allTransaction: async (req, res) => {
        try {
            let { warehouse, order_status_id, from, to } = req.body
            console.log(`ini from ya ${moment(from).add(1, 'days').format().split("T")[0]}`)
            console.log(`ini to ya ${to}`)
            if (!from && !to) {
                if (order_status_id == 0) {
                    console.log('masuk 1')
                    var response = warehouse ? await db.transaction.findAll({
                        where: { location_warehouse_id: warehouse },
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
                    console.log('masuk 2')
                    var response = warehouse ? await db.transaction.findAll({
                        where: { location_warehouse_id: warehouse, order_status_id },
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
            } else if (!to) {
                console.log('masuk 3')
                if (order_status_id == 0) {
                    var response = warehouse ? await db.transaction.findAll({
                        where: { location_warehouse_id: warehouse, updatedAt: moment(from).add(1, 'days').format().split("T")[0] },
                        include: [
                            { model: db.location_warehouse },
                            { model: db.transaction_detail },
                            { model: db.order_status }
                        ]
                    })
                        :
                        await db.transaction.findAll({
                            where: {
                                updatedAt: moment(from).add(1, 'days').format().split("T")[0]
                            },
                            include: [
                                { model: db.location_warehouse },
                                { model: db.transaction_detail },
                                { model: db.order_status }
                            ]
                        })
                } else {
                    console.log('masuk 4')
                    console.log(order_status_id)
                    var response = warehouse ? await db.transaction.findAll({
                        where: { location_warehouse_id: warehouse, order_status_id, updatedAt: moment(from).add(1, 'days').format().split("T")[0] },
                        include: [
                            { model: db.location_warehouse },
                            { model: db.transaction_detail },
                            { model: db.order_status }
                        ]
                    })
                        :
                        await db.transaction.findAll({
                            where: { order_status_id, updatedAt: moment(from).add(1, 'days').format().split("T")[0] },
                            include: [
                                { model: db.location_warehouse },
                                { model: db.transaction_detail },
                                { model: db.order_status }
                            ]
                        })
                }
            } else {
                console.log('masuk 5')
                if (order_status_id == 0) {
                    var response = warehouse ? await db.transaction.findAll({
                        where: {
                            location_warehouse_id: warehouse,
                            updatedAt: {
                                [Op.gte]: moment(from).add(1, 'days').format().split("T")[0],
                                [Op.lte]: moment(to).add(1, 'days').format().split("T")[0]
                            }
                        },
                        include: [
                            { model: db.location_warehouse },
                            { model: db.transaction_detail },
                            { model: db.order_status }
                        ]
                    })
                        :
                        await db.transaction.findAll({
                            where: {
                                updatedAt: {
                                    [Op.gte]: moment(from).add(1, 'days').format().split("T")[0],
                                    [Op.lte]: moment(to).add(1, 'days').format().split("T")[0]
                                }
                            },
                            include: [
                                { model: db.location_warehouse },
                                { model: db.transaction_detail },
                                { model: db.order_status }
                            ]
                        })
                } else {
                    console.log('masuk 6')
                    var response = warehouse ? await db.transaction.findAll({
                        where: {
                            location_warehouse_id: warehouse, order_status_id,
                            updatedAt: {
                                [Op.gte]: moment(from).add(1, 'days').format().split("T")[0],
                                [Op.lte]: moment(to).add(1, 'days').format().split("T")[0]
                            }
                        },
                        include: [
                            { model: db.location_warehouse },
                            { model: db.transaction_detail },
                            { model: db.order_status }
                        ]
                    })
                        :
                        await db.transaction.findAll({
                            where: {
                                order_status_id, updatedAt: {
                                    [Op.gte]: moment(from).add(1, 'days').format().split("T")[0],
                                    [Op.lte]: moment(to).add(1, 'days').format().split("T")[0]
                                }
                            },
                            include: [
                                { model: db.location_warehouse },
                                { model: db.transaction_detail },
                                { model: db.order_status }
                            ]
                        })
                }
            }
            if (!response) throw { message: 'data not found!' }
            res.status(201).send({
                isError: false,
                message: 'get data transaction success!',
                data: response
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
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
        const t = await sequelize.transaction()
        try {
            // let getToken = req.dataToken
            // console.log(getToken)
            let { user_id, ongkir, receiver, address, courier, user_name, phone_number, subdistrict, province, city, upload_payment, cart, user_address_id } = req.body

            let findData = await db.user_address.findOne({
                where: {
                    id: user_address_id
                }
            }, { transaction: t })
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
                latlongWH.push(d / 1000)
                distanceWH.push(latlongWH)
            }
            console.log(distanceWH)

            let closestWH = distanceWH[0][1]
            let cityWH

            for (let i = 0; i < distanceWH.length; i++) {
                if (distanceWH[i][1] < closestWH) {
                    closestWH = distanceWH[i][1]
                    cityWH = distanceWH[i][0]
                }
            }
            // console.log(cityWH,closestWH)

            let findWH = await db.location_warehouse.findOne({
                where: {
                    city: cityWH
                }
            }, { transaction: t })
            // console.log(findWH)

            // console.log(Math.min(...closestWH))


            var kreat = await db.transaction.create({
                user_id, ongkir, receiver, address, warehouse_city: findWH.dataValues.city, location_warehouse_id: findWH.dataValues.id, courier, user_name, phone_number, subdistrict, city, province, upload_payment, order_status_id: 1
            }, { transaction: t })

            await sequelize.query(`CREATE EVENT transaction_expired_${kreat.dataValues.id} ON SCHEDULE AT NOW() + INTERVAL 10 SECOND DO UPDATE transactions SET order_status_id = 6 WHERE id = (${kreat.dataValues.id}) AND upload_payment IS NULL;`)

            await db.status_transaction_log.create({
                transaction_id: kreat.dataValues.id, order_status_id: 1
            }, { transaction: t })

            cart.forEach(async (item, index) => {
                await db.transaction_detail.create({
                    transaction_id: kreat.dataValues.id, qty: item.qty, price: item.product_detail.price,
                    product_name: item.product.name, weight: item.product_detail.weight, memory_storage: item.product_detail.memory_storage,
                    color: item.product_detail.color, product_img: item.product.product_images[0].img, category_id: item.product.category_id, product_detail_id: item.product_detail.id,

                })
            }, { transaction: t })

            await t.commit()
            res.status(201).send({
                isError: false,
                message: 'data success',
                data: kreat
            })
        } catch (error) {
            // console.log(error)
            await t.rollback()
            res.status(401).send({
                isError: true,
                message: error,
                data: null
            })
        }
    },
    updateOrder: async (req, res) => {
        let { transaction_id, code, load, warehouse_id } = req.query

        if (code == 3) {
            //dibawah ini apabila kondisi qty barang di warehouse yg bersangkutan tidak memenuhi jumlahnya

            //getting the transaction data
            let transaction_detail = JSON.parse(load)

            // //modify rumus dari rapi
            //nyari data WH yang bersangkutan


            transaction_detail.forEach(async (item, index) => {
                var findData = await db.location_warehouse.findOne({
                    where: {
                        id: warehouse_id
                    },
                    include: {
                        model: db.location_product, where: {
                            product_detail_id: item.product_detail_id
                        }
                    }
                })
                // console.log(findData.dataValues.location_products[0].dataValues.qty)
                let dataWH = await db.location_warehouse.findAll({
                    where: {
                        id: { [Op.ne]: warehouse_id }
                    },
                    include: {
                        model: db.location_product,
                        where: {
                            product_detail_id: item.product_detail_id,
                            qty: { [Op.gt]: 0 }
                        }
                    }
                })
                // console.log(dataWH[0].dataValues.location_products[0].dataValues)
                var distanceWH = []
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
                    latlongWH.push(d / 1000)
                    latlongWH.push(dataWH[i].dataValues.id)

                    latlongWH.push(dataWH[i].dataValues.location_products[0].dataValues.qty)

                    distanceWH.push(latlongWH)
                }
                //fcking sort the things
                distanceWH.sort((a, b) => a[0] - b[0])
                console.log(distanceWH)

                //get qty item in origin warehouse
                let dataCompare = await db.location_product.findOne({
                    where: {
                        location_warehouse_id: warehouse_id,
                        product_detail_id: item.product_detail_id
                    }
                })

                let initialQty = dataCompare.dataValues.qty
                for (let i = 0; i < distanceWH.length; i++) {
                    let x = item.qty - initialQty
                    if (distanceWH[i][2] - x > 0) {
                        await db.location_product.update({
                            qty: distanceWH[i][2] - x
                        },
                            {
                                where: {
                                    location_warehouse_id: distanceWH[i][1],
                                    product_detail_id: item.product_detail_id
                                }
                            })

                        await db.location_product.update({
                            qty: item.qty
                        },
                            {
                                where: {
                                    location_warehouse_id: warehouse_id,
                                    product_detail_id: item.product_detail_id
                                }
                            })


                        await db.log_request.create({
                            location_product_id_origin: distanceWH[i][1],
                            location_product_id_target: warehouse_id,
                            qty: x,
                            order_status_id: 8
                        })

                        break
                    } else {
                        await db.location_product.update({
                            qty: 0
                        },
                            {
                                where: {
                                    location_warehouse_id: distanceWH[i][1],
                                    product_detail_id: item.product_detail_id
                                }
                            })

                        await db.log_request.create({
                            location_product_id_origin: distanceWH[i][1],
                            location_product_id_target: warehouse_id,
                            qty: distanceWH[i][2],
                            order_status_id: 8
                        })

                        initialQty += distanceWH[i][2]
                    }
                }
            })

            db.status_transaction_log.create({
                transaction_id, order_status_id: code
            })

            db.transaction.update({ order_status_id: code }, {
                where: {
                    id: transaction_id
                }
            })
        } else if (code == 1) {
            db.transaction.update({ order_status_id: code, upload_payment: null }, {
                where: {
                    id: transaction_id
                }
            })

            db.status_transaction_log.create({
                transaction_id, order_status_id: code
            })
        }

        res.status(201).send({
            isError: false,
            message: code == 3 ? 'Order Confirmed' : 'Order Canceled'
        })
    },
    getDataTransaction: async (req, res) => {
        try {
            let getToken = req.dataToken
            // console.log(getToken)
            let { id } = req.query
            // console.log(id)

            let data = await db.transaction.findOne({
                where: {
                    user_id: getToken.id,
                    id
                },
                include: [
                    { model: db.order_status },
                    { model: db.transaction_detail }
                ]
            })

            // console.log(data)
            res.status(201).send({
                isError: false,
                message: 'data success',
                data
            })
        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error,
                data: null
            })
        }
    },
    allTransactionUser: async (req, res) => {
        try {
            let getToken = req.dataToken
            // console.log(getToken)

            let data = await db.transaction.findAll({
                where: {
                    user_id: getToken.id
                },
                include: [
                    { model: db.order_status },
                    { model: db.transaction_detail }
                ]
            })

            // console.log(data)
            res.status(201).send({
                isError: false,
                message: 'data success',
                data
            })
        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error,
                data: null
            })
        }
    },
    detailTransactionUser: async (req, res) => {
        try {
            let { id } = req.params

            let data = await db.transaction.findOne({
                where: {
                    id: id
                },
                include: [
                    { model: db.order_status },
                    { model: db.transaction_detail }
                ]
            })

            // console.log(data)
            res.status(201).send({
                isError: false,
                message: 'Get Detail Transaction Success',
                data: data
            })

        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error,
                data: null
            })
        }
    },
    uploadPayment: async (req, res) => {
        const t = await sequelize.transaction()
        try {
            let { id } = req.body

            let paymentProof = await db.transaction.update({ upload_payment: req.files.images[0].path, order_status_id: 2 }, {
                where: {
                    id: id
                }
            }, { transaction: t })

            await t.commit()
            res.status(201).send({
                isError: false,
                message: 'Upload Payment Proof Success!',
                data: paymentProof
            })

        } catch (error) {
            await t.rollback()
            deleteFiles(req.files)
            console.log(error)
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    cancelTransactions: async (req, res) => {
        try {
            let { id } = req.body
            // console.log(id)

            await db.transaction.update({
                order_status_id: 6
            }, {
                where: {
                    id
                }
            })

            res.status(201).send({
                isError: false,
                message: 'Cancel Transaction Success!',
                data: null
            })
        } catch (error) {
            res.status(401).send({
                isError: true,
                message: error,
                data: null
            })
        }
    }
}