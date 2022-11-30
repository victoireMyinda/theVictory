const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    cliendID: {
        type: String
    },

    name: {
        type: String,
    },

    pseudo: {
        type: String,
        unique: true,
        default: this.name,
    },

    avatar: {
        type: String
    },

    lienFacebook: {
        type: String,
        default: "https://web.facebook.com/victoire.myinda"
    },

    lienLinkdin: {
        type: String,
        default: "https://www.linkedin.com/in/victoire-myinda-5675641ba/"
    },

    lienGithub: {
        type: String,
        default: "https://github.com/victoireMyinda"
    },

    lienPortfolio: {
        type: String,
        default: "https://github.com/victoireMyinda"
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('usermodel', userSchema)
module.exports = userModel