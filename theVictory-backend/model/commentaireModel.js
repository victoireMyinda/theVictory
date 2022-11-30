const mongoose = require('mongoose')

const commentaireSchema = mongoose.Schema({
    description: { type: String },
    tag: { type: String },
    point: { type: Number, default: 0 },
    isParent: true,
    parent: { type: String },
    dateCreation: { type: String },
    dateDerniereModification: { type: String },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel'
    },
    video: {
        id: { type: String },
        titre: { type: String }
    },
})

const commentaireModel = mongoose.model("commentairemodel", commentaireSchema)
module.exports = commentaireModel