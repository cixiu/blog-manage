const Router = require('koa-router')
const Admin = require('../controllers/admin/admin')
const router = new Router()

router.post('/register', Admin.register)
router.post('/login', Admin.login)
router.get('/info', Admin.getAdminInfo)
router.get('/list', Admin.getAdminList)
router.get('/count', Admin.getAdminCount)

module.exports = router
