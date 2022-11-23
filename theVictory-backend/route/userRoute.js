const express = require('express')

const { createUser, findUser, updateUser } = require('../controller/userController')

const router = express.Router()

router.post('/user', createUser)
router.get('/user', findUser)
router.put('/user', updateUser)

module.exports = router