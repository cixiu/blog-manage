const Router = require('koa-router')
const Article = require('../controllers/article/article')
// const Comments = require('../controllers/article/comments')
const router = new Router()

router.post('/create', Article.create)
router.get('/list', Article.getArticleList)
router.get('/count', Article.getArticleCount)
router.get('/delete', Article.deleteArticle)
router.get('/detail', Article.getArticleDetail)
router.post('/update', Article.updateArticle)

// router.post('/comments/create', Comments.create)

module.exports = router
