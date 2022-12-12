const router = require('express').Router()
const postModel = require('../controllers/postController')

router.get('/', postModel.readPost);
router.post('/', postModel.getPostByVideoId)
router.patch('/likeVideo/:id', postModel.likePost)
router.patch('/unLikeVideo/:id', postModel.unlikePost)
router.post('/commentSousComment/', postModel.commentSousPost)
router.patch('/comment-post/:id', postModel.addComment)

module.exports = router