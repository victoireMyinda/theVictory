const mongoose = require('mongoose')

const schemaUser = mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    links: { type: [String] },
    likes: {
        type: [String]
    },

}, {
    timestamps: true
})

module.exports = modelUser = mongoose.model('user', schemaUser)