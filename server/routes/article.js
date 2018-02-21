const Router = require('koa-router')
const Article = require('../controllers/article/article')
const router = new Router()

router.post('/create', Article.create)
router.get('/list', Article.getArticleList)
router.get('/count', Article.getArticleCount)
router.get('/delete', Article.deleteArticle)
router.get('/detail', Article.getArticleDetail)
router.post('/update', Article.updateArticle)

module.exports = router
