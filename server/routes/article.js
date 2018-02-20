const Router = require('koa-router')
const Article = require('../controllers/article/article')
const router = new Router()

router.post('/create', Article.create)
router.get('/list', Article.getArticleList)
router.get('/count', Article.getArticleCount)

module.exports = router
