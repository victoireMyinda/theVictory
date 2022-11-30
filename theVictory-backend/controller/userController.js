const asyncHandler = require('express-async-handler')
const userModel = require('../model/userModel')
const generateToken = require('../utils/generateToken')

//@description     Auth the user
//@route           POST /user/api
//@access          Public
const authUser = asyncHandler(async(request, response) => {
    const { pseudo, cliendID } = request.body;

    const user = await userModel.findOne({ pseudo });

    if (user) {
        response.json({
            _id: user._id,
            clientID: user.cliendID,
            name: user.name,
            pseudo: user.pseudo,
            avatar: user.avatar,
            lienFacebook: user.lienFacebook,
            lienLinkdin: user.lienLinkdin,
            lienGithub: user.lienGithub,
            lienPortfolio: user.lienPortfolio,
            token: generateToken(user._id),
        });
    } else {
        response.status(401);
        throw new Error("Invalid");
    }
});


//@description     Register new user
//@route           POST /user/api
//@access          Public
const registerUser = asyncHandler(async(request, response) => {
    const { cliendID, name, avatar } = request.body;

    const userExists = await userModel.findOne({ name });

    if (userExists) {
        response.status(404);
        throw new Error("User already exists");
    }

    const user = await userModel.create({
        cliendID,
        name,
        avatar
    });

    if (user) {
        response.status(201).json({
            _id: user._id,
            clientID: user.cliendID,
            name: user.name,
            pseudo: user.pseudo,
            avatar: user.avatar,
            lienFacebook: user.lienFacebook,
            lienLinkdin: user.lienLinkdin,
            lienGithub: user.lienGithub,
            lienPortfolio: user.lienPortfolio,
            token: generateToken(user._id),
        });
    } else {
        response.status(400);
        throw new Error("User not found");
    }
});


// @desc    GET user profile one or many
// @route   GET /api/user
// @access  Private
const getUser = async(request, response) => {

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
            .then(client => {
                response.send(client)
                response.status(200)
            })
            .catch(err => {
                response.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }
}


// @desc    GET user profile
// @route   GET /user/api
// @access  Private
const updateUserProfile = asyncHandler(async(request, response) => {
    const user = await userModel.findById(request.user._id);

    if (user) {
        user.name = request.body.name || user.name,
            user.pseudo = request.body.pseudo || user.pseudo,
            user.avatar = request.body.avatar || user.avatar,
            user.lienFacebook = request.body.lienFacebook || user.lienFacebook,
            user.lienLinkdin = request.body.lienLinkdin || user.lienLinkdin,
            user.lienGithub = request.body.lienGithub || user.lienGithub,
            user.lienPortfolio = request.body.lienPortfolio || user.lienPortfolio

        const updatedUser = await user.save();

        response.json({
            _id: user._id,
            clientID: user.cliendID,
            name: user.name,
            pseudo: user.pseudo,
            avatar: user.avatar,
            lienFacebook: user.lienFacebook,
            lienLinkdin: user.lienLinkdin,
            lienGithub: user.lienGithub,
            lienPortfolio: user.lienPortfolio,
            token: generateToken(user._id),
        });
    } else {
        response.status(404);
        throw new Error("User Not Found");
    }
});

module.exports = { authUser, registerUser, getUser, updateUserProfile }