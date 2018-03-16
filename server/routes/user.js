const Router = require('koa-router')
const User = require('../controllers/user/user')
const router = new Router()

router.post('/login', User.login)
router.get('/info', User.getUserInfo)
router.get('/list', User.getUserList)
router.get('/count', User.getUserCount)
router.get('/logout', User.logout)

module.exports = router
