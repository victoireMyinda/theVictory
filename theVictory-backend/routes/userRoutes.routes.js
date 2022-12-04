const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/', userController.RegisterUser)
router.get('/:id', userController.getOneUser)
router.get('/', userController.getAllUsers)
router.put('/:id', userController.updateUser)

module.exports = router