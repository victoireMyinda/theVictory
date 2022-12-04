const postModel = require('../models/modelPost')
const userModel = require('../models/modelUser')
const ObjectID = require('mongoose').Types.ObjectId;

const createComment = async(req, res) => {
    try {
        return postModel.create({
                videoID: req.body.videoID,
                commentaires: {
                    commentaireID: req.body.commentaireID,
                    userName: req.body.userName,
                    description: req.body.description,
                    timestamp: new Date().getTime()
                }
            }, )
            .then((docs) => {
                res.status(200).send({
                    message: 'Commentaire ajouté avec succès',
                    data: docs
                })
            })
            .catch((err) => { return res.status(400).send({ message: err }) })
    } catch (err) {
        return res.status(400).send({ message: err })
    }
}

const likePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID invalid : ' + req.params.id)
    } else {
        try {
            postModel.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.body.id } }, { new: true })
                .then((docs) => { res.status(200).send(docs) })
                .catch((err) => { return res.status(500).send({ message: err }) })

            userModel.findByIdAndUpdate(req.body.id, { $addToSet: { likes: req.params.id } }, { new: true })
        } catch (err) {
            return res.status(400).send({ message: err })
        }
    }
}

const unlikePost = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID invalid : ' + req.params.id)
    } else {
        try {
            postModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.id } }, { new: true })
                .then((docs) => { res.status(200).send(docs) })
                .catch((err) => { return res.status(400).send({ message: err }) })

            userModel.findByIdAndUpdate(req.body.id, { $pull: { likes: req.params.id } }, { new: true })
        } catch (err) {
            return res.status(400).send({ message: err })
        }
    }
}


const commentSousPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID invalid : ' + req.params.id)
    } else {
        try {
            postModel.findById(req.params.id)
                .then(post => {
                    if (post.commentaires._id === req.body.commenterId) {
                        return postModel.findByIdAndUpdate(
                                req.params.id, {
                                    $push: {
                                        commentaires: {
                                            sousCommentaires: {
                                                commentaireID: req.body.commentaireID,
                                                userName: req.body.userName,
                                                description: req.body.description,
                                                timestamp: new Date().getTime()
                                            }
                                        }
                                    }
                                }, { new: true }
                            )
                            .then((docs) => {
                                res.status(200).send({
                                    message: 'Commentaire ajouté avec succès',
                                    data: docs
                                })
                            })
                            .catch((err) => { return res.status(400).send({ message: err }) })
                    } else {

                    }
                }).catch(err => {
                    return res.status(400).send({ message: err })
                })
        } catch (error) {

        }

    }
}


module.exports = {
    createComment,
    likePost,
    unlikePost,
    commentSousPost
}