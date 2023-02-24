//import sequelize 
const { sequelize } = require('./../models')
const { Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid');

//import models
const db = require('./../models/index')
const users = db.user

//import hashing

//import jwt

// Import transporter
const transporter = require('./../helpers/transporter')

const fs = require('fs').promises

const handlebars = require('handlebars');

module.exports = {
    register: async (req, res) => {
        const t = await sequelize.transaction() 
        try {
            let { name, email, phone_number } = req.body

            let resCreateUsers = await users.create({ name, email, phone_number }, { transaction: t })
            console.log(resCreateUsers)

            const template = await fs.readFile('./template/confirmation.html', 'utf-8')
            const templateToCompile = await handlebars.compile(template)
            const newTemplate = templateToCompile({ name, url: `http://localhost:3000/activation/${resCreateUsers.dataValues.id}` })
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
                data: null
            })

        } catch (error) {
            await t.rollback()
            res.status(401).send({
                isError: true,
                message: error.message,
            })
        }
    }
}