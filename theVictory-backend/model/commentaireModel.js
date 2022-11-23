const mongoose = require('mongoose')

const commentaireSchema = mongoose.Schema({
    description: { type: String },
    date_publication: { type: String },
    like: { type: Number },
    dislike: { type: Number },
    sousCommentaire: { type: Array },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel'
    }
})

const commentaireModel = mongoose.model("commentairemodel", commentaireSchema)
module.exports = commentaireModel