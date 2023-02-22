//import sequelize 
const {sequelize} = require('../models')
const { Op } = require('sequelize')
const {v4:uuidv4} = require('uuid');


//import models
const db = require('./../models/index')

//import hashing
const { hashPassword, hashMatch } = require('../lib/hashpassword');
//import jwt
const { createToken } = require('../lib/jwt');

module.exports= {
    register:async(req,res)=>{
                try {
                    // let {email,password,role} = req.body
                    // console.log(email)

                    // let newSuper = await db.admin.create({id:uuidv4(), password: await hashPassword(password), email, role})
                    // console.log(role)
                    // console.log(newSuper)

                    let {email,role} = req.body
                    let newSuper = await db.admin.update({
                        role
                    },
                    {
                        where:{
                            email
                        }
                    }
                    )
                    
                    console.log(newSuper)
                    res.status(201).send({
                        message:'Login Success',
                        data: newSuper
                    })
                } catch (error) {
                    
                }
    },
    getAllAdmin:async(req,res)=>{
      try {
        let allData = await db.admin.findAll()
        
        res.status(201).send({
            isError:false,
            message:'Get Data Success!',
            data:{
                allData
            }
        })
      } catch (error) {
        res.status(404).send({
            isError:true,
            message:error.message,
            data:null
        })
      }  
    },
    
    adminLogin: async(req,res)=>{
        try {
           let {email, password}= req.body
           console.log(password)
           
           let dataAdmin = await db.admin.findOne({
            where:{
                email
            }
           })
           
           if(!hashMatch(password, dataAdmin.password)) throw{message:'Password wrong!'}
           if(!dataAdmin) throw {message:'Wrong Email!'}      

           res.status(201).send({
            isError:false,
            message:'Login Success!',
            data: 
                dataAdmin
            
           })

           
        } catch (error) {
            res.status(404).send({
                isError:true,
                message: error.message,
                data:null
               })
        }
    }
}