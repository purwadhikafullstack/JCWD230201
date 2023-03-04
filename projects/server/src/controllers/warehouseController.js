//import sequelize
const { sequelize } = require('../models')
const { Op } = require('sequelize')


const db = require('../models/index')
const axios = require('axios')

module.exports = {
    getDataWH: async (req, res) => {

        let getWH = await db.location_warehouse.findAll()

        res.status(201).send({
            isError: false,
            message: 'get data success',
            data: getWH
        })
    },
    addWH: async (req, res) => {
        let { province, city, subdistrict, address, city_id, province_id } = req.body


        let jalan = `${address} ${subdistrict} ${city} ${province}`
        console.log(jalan)

        let response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${jalan}&key=f3582c716b9f443a9d260569d39b1ac3`)
        // console.log(response.data.results[0].geometry.lat)
        // console.log(response.data.results[0].geometry.lng)
        let dataWH = await db.location_warehouse.create({
            province, city, subdistrict, address, latitude: response.data.results[0].geometry.lat, longitude: response.data.results[0].geometry.lng, city_id, province_id
        })
        res.status(201).send({
            isError: false,
            message: 'Create Data WH Success!',
            data: dataWH
        })
    },
    updateWH: async (req, res) => {
        let { id, province, city, subdistrict, address, city_id, province_id } = req.body
        let jalan = `${address} ${subdistrict} ${city} ${province}`

        let response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${jalan}&key=f3582c716b9f443a9d260569d39b1ac3`)

        console.log(response)
        await db.location_warehouse.update({
            province, city, subdistrict, address, latitude: response.data.results[0].geometry.lat, longitude: response.data.results[0].geometry.lng, city_id, province_id
        },
            {
                where: {
                    id
                }
            }
        )
        res.status(201).send({
            isError:false,
            message:'Update WH success!'
        })
    },
    deleteWH: async(req,res)=>{
        let {id}= req.body

        await db.location_warehouse.destroy({
            where:{
                id
            }
        })
        res.status(201).send({
            isError:false,
            message:'Delete WH Success!'
        })
    }
   

}