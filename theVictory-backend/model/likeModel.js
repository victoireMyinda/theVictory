const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user: {
        id: { type: mongoose.Schema.Types.ObjectId },
        pseudo: String,
        ref: 'usermodel'
    },
    commentaire: {
        id: { type: String },
        idParent: { type: String }
    },
    estActif: true,
    dateCreation: { type: String },
    dateDerniereModification: { type: String },
})

const likeModel = mongoose.model('likemodele', likeSchema)
module.exports = likeModel