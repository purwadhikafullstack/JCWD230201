//import sequelize 
const { sequelize } = require('../models')
const { Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid');


//import models
const db = require('./../models/index')

//import hashing
const { hashPassword, hashMatch } = require('../lib/hashpassword');
//import jwt
const { createToken } = require('../lib/jwt');

module.exports = {
    register: async (req, res) => {
        try {
            let { email, password, role } = req.body
            console.log(email)

            let newSuper = await db.admin.create({ id: uuidv4(), password: await hashPassword(password), email, role })
            console.log(role)
            console.log(newSuper)

            // let { email, role } = req.body
            // let newSuper = await db.admin.update({
            //     role
            // },
            //     {
            //         where: {
            //             email
            //         }
            //     }
            // )

            console.log(newSuper)
            res.status(201).send({
                message: 'Login Success',
                data: newSuper
            })
        } catch (error) {

        }
    },
    getAllAdmin: async (req, res) => {
        try {
            let allData = await db.admin.findAll({
                where:{
                    role:2
                },
                include:[{model:db.location_warehouse}]
            })
            console.log(allData[4].dataValues.role)
            let loader = allData.map((item,index)=>{
                return(
                    {
                        id:item.dataValues.id?item.dataValues.id:null,
                        name: item.dataValues.name?item.dataValues.name:null,
                        email:item.dataValues.email?item.dataValues.email:null,
                        gender:item.dataValues.gender?item.dataValues.gender:null,
                        phone_number:item.dataValues.phone_number?item.dataValues.phone_number:null,
                        role:item.dataValues.role?item.dataValues.role:null,
                        location_warehouse_id:item.dataValues.location_warehouse_id?item.dataValues.location_warehouse_id:null,
                        location_warehouse:item.dataValues.location_warehouse?item.dataValues.location_warehouse.dataValues.city:null
                    }
                )
            })
            // console.log(loader)
            // console.log(allData[1].dataValues.location_warehouse)

            res.status(201).send({
                isError: false,
                message: 'Get Data Success!',
                data: {
                   loader

                }
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },

    adminLogin: async (req, res) => {
        try {
            let { email, password } = req.body
            // console.log(password)

            if (!email || !password) throw { message: 'Please Fill All Data!' }

            let dataAdmin = await db.admin.findOne({
                where: {
                    email
                },
                include: [{ model: db.location_warehouse }]
            })
            if (!dataAdmin) throw { message: 'Data Not Found!' }
            if (!hashMatch(password, dataAdmin.password)) throw { message: 'Password wrong!' }
          console.log(dataAdmin)
            console.log(dataAdmin.location_warehouse)
            let token = await createToken({ id: dataAdmin.id })

            res.status(201).send({
                isError: false,
                message: 'Login Success!',
                data:
                {
                    'username': `${dataAdmin.name}`,
                    'token': token,
                    'role': `${dataAdmin.role}`,
                    'warehouse': dataAdmin.location_warehouse_id ?
                        dataAdmin.location_warehouse.city : null

                }

            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    getAllUser: async (req, res) => {

        let allUser = await db.user.findAll()

        let allAdmin = await db.admin.findAll({
            where: {
                role: 2
            }
        })

        res.status(201).send({
            isError: false,
            message: 'get data success',
            data: {
                'user': allUser,
                'admin': allAdmin
            }
        })
    },
    findAdmin: async (req, res) => {
        let { id } = req.body

        let data = await db.admin.findOne({
            where: {
                id
            }
        })

        if (!data) return res.status(404).send({
            isError: true,
            message: 'id not found',
            data: null
        })

        res.status(201).send({
            isError: false,
            message: 'id found!',
            data: data
        })
    },
    update: async (req, res) => {
        try {

            let {id, email,name,gender,phone_number,location_warehouse_id,password} = req.body
         
            if(!name || !email ) throw{message:'Name or Email Empty!'}

            // let matchData = await db.admin.findOne({
            //     where:{
            //         [Op.and]:[
            //             {id},{email},{name}
            //         ]
            //     }
            // }) 
            // if(matchData) throw {message:'Email or Name has been used!'} 

            if(password.length==0){
                await db.admin.update({
                email,name,phone_number,location_warehouse_id,gender
            },
            {
                where:{
                    id
                }
            }
            )
        }else {
            await db.admin.update({
                email,name,phone_number,location_warehouse_id,gender,password: await hashPassword(password)
            },
                {
                    where: {
                        id
                    }
                }
            )
        }

            res.status(201).send({
                isError: false,
                message: 'update success!'
            })
        } catch (error) {
          
            res.status(404).send({
                isError:true,
                message:error.message,
                data:null
            })
        }
    },
    delete: async (req, res) => {
        let { id } = req.body
        let deleteAdmin = await db.admin.destroy({
            where: {
                id
            }
        })
        res.status(201).send({
            isError: false,
            message: 'Admin Deleted!',
        })
    },
    keep_login: async (req, res) => {

        let getToken = req.dataToken

        console.log(getToken)


        let getDataUser = await db.user.findOne({
            where: {
                id: getToken.id
            }
        })
        console.log(getDataUser)
        if (!getDataUser) {
            getDataUser = await db.admin.findOne({
                where: {
                    id: getToken.id
                },
                include: [{ model: db.location_warehouse }]
            })
        }
        res.status(201).send({
            isError: false,
            message: 'token still valid',
            data: {
                token: getToken,
                username: getDataUser.name,
                role: getDataUser.role,
                warehouse: getDataUser.location_warehouse_id ?
                    getDataUser.location_warehouse.city : null,
                photo_profile: getDataUser.photo_profile ? getDataUser.photo_profile : null
                role:getDataUser.role,
                warehouse:getDataUser.location_warehouse_id?
                getDataUser.location_warehouse.city:null
            }
        })
    }
}