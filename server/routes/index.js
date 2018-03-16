const Router = require('koa-router')
const router = new Router()

const admin = require('./admin')
const article = require('./article')
const user = require('./user')

module.exports = app => {
  router.use('/api/admin', admin.routes(), admin.allowedMethods())
  router.use('/api/article', article.routes(), article.allowedMethods())
  router.use('/api/user', user.routes(), user.allowedMethods())

  app.use(router.routes())
  app.use(router.allowedMethods())
}
