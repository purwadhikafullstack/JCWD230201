//define router
const adminRouter = require('./adminRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')

//export it

module.exports={
    adminRouter,
    productRouter,
    userRouter
}