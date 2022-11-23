const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nom: { type: String },
    prenom: { type: String },
    avatar: { type: String },
    lien_facebook: { type: String },
    lien_linkdin: { type: String },
    lien_github: { type: String },
    lien_portfolio: { type: String },
}, {
    timestamps: true
})

const userModel = mongoose.model('usermodel', userSchema)
module.exports = userModel