const Router = require('koa-router')
const Comments = require('../controllers/comments/comments')
const router = new Router()

router.post('/create', Comments.create)
router.get('/list', Comments.getArticleComments)
router.post('/like', Comments.likeComment)
router.post('/:commentId/:userId/reply/:respUserId', Comments.replyComment)

module.exports = router
