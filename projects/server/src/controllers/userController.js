//import sequelize 
const { sequelize } = require('./../models')
const { Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid');

//import models
const db = require('./../models/index')
const users = db.user

//import hashing
const { hashPassword, hashMatch } = require('../lib/hashpassword');

//import jwt
const { createToken } = require('../lib/jwt');

// Import transporter
const transporter = require('./../helpers/transporter')

const fs = require('fs').promises

const handlebars = require('handlebars');
const { match } = require('assert');

module.exports = {
    register: async (req, res) => {
        const t = await sequelize.transaction()
        try {
            let { name, email, phone_number } = req.body

            let resCreateUsers = await users.create({ id: uuidv4(), name, email, phone_number, password: 'Abcde12345', status: 'Unverified' }, { transaction: t })
            console.log(resCreateUsers)

            const template = await fs.readFile('./template/confirmation.html', 'utf-8')
            const templateToCompile = await handlebars.compile(template)
            const newTemplate = templateToCompile({ name, email, url: `http://localhost:3000/activation/${resCreateUsers.dataValues.id}` })
            await transporter.sendMail({
                from: 'iFrit',
                to: email,
                subject: 'Account Activation',
                html: newTemplate
            })

            await t.commit()
            res.status(201).send({
                isError: false,
                message: 'Register Success',
                data: resCreateUsers
            })

        } catch (error) {
            await t.rollback()
            console.log(error)
            res.status(401).send({
                isError: true,
                message: error.errors[0].message,
            })
        }
    },
    activation: async (req, res) => {
        const t = await sequelize.transaction()
        try {
            let { id } = req.params
            let { password } = req.body

            if (password.length < 8) throw { message: 'Password at least has 8 characters' }

            let character = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
            if (!character.test(password)) throw { message: 'Password must contains number' }

            await users.update(
                { status: 'Verified', password: await hashPassword(password) },
                {
                    where: {
                        id
                    }
                }, { transaction: t }
            )

            await t.commit()
            res.status(201).send({
                isError: false,
                message: 'Account Verified!',
                data: null
            })
        } catch (error) {
            await t.rollback()
            console.log(error)
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    getStatusUser: async (req, res) => {
        try {
            let { id } = req.params
            // console.log(id)

            let data = await db.user.findOne({
                where: {
                    id
                }
            })

            res.status(201).send({
                isError: false,
                message: 'get Status Success',
                data
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
    userLogin: async (req, res) => {
        try {
            let { email, password } = req.body
            console.log(email)
            console.log(password)

            if (!password) throw { message: 'Please Fill All Data!' }

            let dataUser = await db.user.findOne({
                where: {
                    email
                }
            })
            console.log(dataUser.dataValues)
            if (!dataUser) throw { message: 'Account not found!' }

            let matchPassword = await hashMatch(password, dataUser.dataValues.password)

            if (matchPassword === false) return res.status(404).send({
                isError: true,
                message: 'Password Not Found',
                data: null
            })

            const token = createToken({ id: dataUser.dataValues.id, name: dataUser.dataValues.name })

            res.status(201).send({
                isError: false,
                message: 'Login Success',
                data: {
                    'username': `${dataUser.dataValues.name}`,
                    'token': token,
                    'role': null
                }
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    }
}