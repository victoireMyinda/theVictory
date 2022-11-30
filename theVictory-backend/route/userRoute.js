const express = require('express')

const { authUser, registerUser, getUser, updateUserProfile } = require('../controller/userController')

const router = express.Router()

router.post('/api/user', registerUser)
router.get('/api/user', getUser)
router.put('/api/user/:id', updateUserProfile)

module.exports = router