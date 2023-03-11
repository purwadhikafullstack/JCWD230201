//define router
const adminRouter = require('./adminRouter'), transactionRouter = require('./transactionRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const addressRouter = require('./addressRouter')
const rajaongkirRouter = require('./rajaongkirRouter')
const warehouseRouter = require('./warehouseRouter')
const cartRouter = require("./cartRouter")

//export it

module.exports={
    adminRouter,
    productRouter,
    userRouter,
    transactionRouter,
    addressRouter,
    rajaongkirRouter,
    warehouseRouter,
    cartRouter
}