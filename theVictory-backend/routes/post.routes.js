const router = require('express').Router()
const postModel = require('../controllers/postController')

router.post('/', postModel.createComment)
router.patch('/likeVideo/:id', postModel.likePost)
router.patch('/unLikeVideo/:id', postModel.unlikePost)
router.patch('/commentSousComment/:id', postModel.commentSousPost)

module.exports = router