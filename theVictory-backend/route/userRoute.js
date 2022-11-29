const express = require('express')

const { createUser, getUser, updateUser, editUser } = require('../controller/userController')

const router = express.Router()

router.post('/create', createUser)
router.get('/get', getUser)
router.get('/edit/:id', editUser)
router.put('/user/:id', updateUser)

module.exports = router