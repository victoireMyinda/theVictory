const handler = require('express-async-handler')
const userModel = require('../model/userModel.js')


const createUser = handler(async(request, response) => {
    response.status(200).send({ message: 'user created success' })
})

const findUser = handler(async(request, response) => {
    response.status(200).send({ message: 'user finded success' })
})

const updateUser = handler(async(request, response) => {
    response.status(200).send({ message: 'user updated success' })
})




module.exports = { createUser, findUser, updateUser }