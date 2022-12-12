const postModel = require('../models/modelPost')
const userModel = require('../models/modelUser')
const ObjectID = require('mongoose').Types.ObjectId;

const readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Erreur to get data : ', +err)
    }).sort({ createdAt: -1 });
};

const getPostByVideoId = async(req, res) => {
    try {
        postModel.findOne({ videoID: new RegExp('^' + req.body.videoID + '$', "i") }, (err, doc) => {
            if (!err) {
                if (doc) {
                    return res.status(200).json(doc._id)
                } else {
                    postModel.create({
                            videoID: req.body.videoID,
                        })
                        .then(resp => {
                            res.status(201).json(resp._id)
                        })
                        .catch(err => {
                            return res.status(500).json('Erreur interne du serveur')
                        })
                }
            }
        })
    } catch (err) {
        return res.status(400).send({ message: err })
    }
}

const addComment = async(req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    } else {
        try {
            return postModel.findByIdAndUpdate(
                    req.params.id, {
                        $push: {
                            commentaires: {
                                commentaireID: req.body.commentaireID,
                                userName: req.body.userName,
                                description: req.body.description,
                                timestamp: new Date()
                            }
                        }
                    }, { new: true }
                )
                .then((docs) => {
                    res.status(201).send({
                        message: 'Commentaire ajouté avec succès',
                        data: docs
                    })
                })
                .catch((err) => { return res.status(400).send({ message: err }) })
        } catch (err) {
            return res.status(400).send({ message: err })
        }
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


const commentSousPost = async(req, res) => {
    try {
        const posts = await postModel.find().sort({ updatedAt: -1 })

        posts.map(val => {
            return res.json(val.commentaires)
        })
    } catch (error) {

    }
}


module.exports = {
    getPostByVideoId,
    likePost,
    unlikePost,
    commentSousPost,
    addComment,
    readPost
}