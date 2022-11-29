const asyncHandler = require('express-async-handler')
const userModel = require('../model/userModel.js')



//Poster les data user obtenu depuis l'API google
const createUser = asyncHandler(
    async(request, response) => {
        const { name, cliendID, avatar } = request.body

        if (!name || !cliendID || !avatar) {
            response.status(400)
            throw new Error("les champs sont requis")
        }

        //check if user exists
        const userExists = await userModel.findOne(({ name }))

        if (userExists) {
            response.status(400)
            throw new Error('user already exists')
        }

        //create user
        const user = await userModel.create({
            cliendID,
            name,
            avatar,
            lien_linkdin,
            lien_facebook,
            lien_github,
            lien_portfolio
        })

        if (user) {
            response.status(201).json({
                ...request.body
            })
        } else {
            response.status(400)
            throw new Error('user invalid data')
        }
    }
)


//Recuperation de user dans database
const getUser = asyncHandler(async(request, response) => {

    if (request.query.id) {
        const id = request.query.id;

        userModel.findById(id)
            .then(data => {
                if (!data) {
                    response.status(404).send({ message: "Not found user with id " + id })
                } else {
                    response.send(data)
                    response.status(200)
                }
            })
            .catch(err => {
                response.status(500).send({ message: "Erro retrieving user with id " + id })
            })

    } else {
        userModel.find()
            .then(user => {
                response.send(user)
                response.status(200)
            })
            .catch(err => {
                response.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }
})



const updateUser = asyncHandler(async(request, response) => {
    response.status(200).send({ message: 'user updated success' })
})

const editUser = asyncHandler(async(request, response) => {
    response.status(200).send({ message: 'user updated success' })
})




module.exports = { createUser, getUser, updateUser, editUser }