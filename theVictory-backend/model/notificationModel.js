const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    types: { type: Tag | Reponse },
    user: {
        id: { type: mongoose.Schema.Types.ObjectId },
        pseudo: String,
        ref: 'usermodel'
    },
    video: {
        id: { type: String },
        titre: { type: String }
    },
    commentaire: {
        id: { type: String },
        idParent: { type: String },
        estLike: true,
        estActif: true,
        dateCreation: { type: String },
        dateDerniereModification: { type: String },
    },
})

const notificationModel = mongoose.model('notificationmodel', notificationSchema)
module.exports = notificationModel