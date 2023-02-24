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
            let {email,password,role} = req.body
            console.log(email)

            let newSuper = await db.admin.create({id:uuidv4(), password: await hashPassword(password), email, role})
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
            let allData = await db.admin.findAll()

            res.status(201).send({
                isError: false,
                message: 'Get Data Success!',
                data: {
                    allData
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
            console.log(password)

            if(!email || !password ) throw {message : 'Please Fill All Data!'}
 
            let dataAdmin = await db.admin.findOne({
                where: {
                    email
                }
            })
            if (!dataAdmin) throw { message: 'Data Not Found!' }
            if (!hashMatch(password, dataAdmin.password)) throw { message: 'Password wrong!' }
          
            console.log(dataAdmin.name)
            let token = await createToken({ id: dataAdmin.id })

            res.status(201).send({
                isError: false,
                message: 'Login Success!',
                data:
                {
                    'username': `${dataAdmin.name}`,
                    'token': token,
                    'role': `${dataAdmin.role}`
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
    getAllUser:async(req,res) =>{

        let allUser = await db.user.findAll()
        let allAdmin = await db.admin.findAll({
            where:{
                role:2
            }
        })
        
        res.status(201).send({
            isError:false,
            message: 'get data success',
            data:{
                'user':allUser,
                'admin': allAdmin
            }
        })
    },
    findAdmin: async(req,res)=>{
            let {id} = req.body

            let data = await db.admin.findOne({
                where:{
                    id
                }
            })

            if(!data) return res.status(404).send({
                isError:true,
                message:'id not found',
                data:null
            })

            res.status(201).send({
                isError:false,
                message:'id found!',
                data: data
            })
    },
    update:async(req,res) =>{
        try {
            let {id, email,name,phone_number,location_warehouse_id} = req.body

            await db.admin.update({
                email,name,phone_number,location_warehouse_id
            },
            {
                where:{
                    id
                }
            }
            )

            res.status(201).send({
                isError:false,
                message:'update success!'
            })
        } catch (error) {
            console.log(error)
        }
    },
    keep_login: async (req, res) => {

        let getToken = req.dataToken

        console.log(getToken)
        let getDataAdmin = await db.admin.findOne({
            where: {
                id: getToken.id
            }
        })


        if (getToken) return res.status(201).send({
            isError: false,
            message: 'token still valid',
            data: {
                token: getToken,
                username: getDataAdmin.name,
                role:getDataAdmin.role
            }
        })
    }
}