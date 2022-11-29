const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    cliendID: { type: String },
    name: { type: String },
    avatar: { type: String },
    lien_facebook: {
        type: String,
        default: "https://web.facebook.com/victoire.myinda"
    },
    lien_linkdin: {
        type: String,
        default: "https://www.linkedin.com/in/victoire-myinda-5675641ba/"
    },
    lien_github: {
        type: String,
        default: "https://github.com/victoireMyinda"
    },
    lien_portfolio: {
        type: String,
        default: "https://github.com/victoireMyinda"
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('usermodel', userSchema)
module.exports = userModel