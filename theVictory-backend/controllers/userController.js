const modelUser = require('../models/modelUser')
const ObjectID = require('mongoose').Types.ObjectId;

const RegisterUser = async(req, res) => {
    try {
        modelUser.findOne({ name: new RegExp('^' + req.body.name + '$', "i") }, (err, doc) => {
            if (!err) {
                if (doc) {
                    return res.status(200).json({ message: 'User existe déjà', doc })
                } else {
                    modelUser.create({
                            name: req.body.name,
                            links: [req.links],
                            avatar: req.body.avatar
                        })
                        .then(resp => {
                            res.status(201).json({ message: 'User créé avec succès', resp })
                        })
                        .catch(err => {
                            return res.status(500).json('Erreur interne du serveur')
                        })
                }
            }
        })
    } catch (error) {
        return res.status(500).json('Erreur interne du serveur')
    }
};

const getAllUsers = async(req, res) => {
    try {
        const users = await modelUser.find();
        const taille = users.length;

        if (users) {
            res.status(200).json({ message: "La liste de users a été récupérée avec succès", users, taille });
        } else {
            res.status(404).json({ message: "Users non trouvé." });
        }
    } catch (error) {
        return res.status(500).json('Erreur interne du serveur')
    }
}

const getOneUser = async(req, res) => {

    try {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).json('Aucun user trouvé avec l\'ID : ' + req.params.id)
        } else {
            modelUser.findById(req.params.id)
                .then(resp => {
                    res.status(200).json(resp)
                }).catch(err => {
                    return res.status(400).json('User inconnu')
                })
        }
    } catch (error) {
        return res.status(500).json('Erreur interne du serveur')
    }
}

const getOneUserByName = async(req, res) => {
    try {
        modelUser.findOne({ name: new RegExp('^' + req.params.id + '$', "i") }, (err, doc) => {
            if (!err) {
                if (doc) {
                    return res.status(200).json(doc)
                } else {
                    return res.status(500).json('Erreur interne du serveur')
                }
            }
        })
    } catch (error) {
        return res.status(500).json('Erreur interne du serveur')
    }
}

const updateUser = async(req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).json('Aucun user trouvé avec ID : ' + req.params.id)
        } else {
            const file = req.files.file;

            file.mv('upload/' + file.name.trim());
            await modelUser.findOneAndUpdate({ _id: req.params.id }, {
                    name: req.body.name,
                    links: [req.body.links],
                    avatar: "../upload/" + file.name
                })
                .then(response => {
                    modelUser.findById(req.params.id)
                        .then(resp => {
                            res.status(200).json({ message: 'User a été modifié avec succès', resp })
                        }).catch(err => {
                            return res.status(400).json('User inconnu')
                        })

                })
                .catch(error => {
                    return res.status(400).json('Aucune modification ' + req.params.id)
                })
        }
    } catch (error) {
        return res.status(500).json('Erreur interne du serveur')
    }
}

module.exports = {
    RegisterUser,
    getAllUsers,
    getOneUser,
    updateUser,
    getOneUserByName
}