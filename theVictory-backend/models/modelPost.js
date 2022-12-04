const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    videoID: {
        type: String
    },
    commentaires: {
        type: [{
            commentaireID: String,
            userName: String,
            description: String,
            timestamp: Number
        }],
        sousCommentaires: {
            type: [{
                commentaireID: String,
                userName: String,
                description: String,
                timestamps: Number
            }]
        },
    },
    likes: [String],
    tags: [{
        commentaireID: String,
        userName: String,
        description: String,
        timestamps: Number
    }]

}, {
    timestamps: true,
})

module.exports = post = mongoose.model('post', postSchema)