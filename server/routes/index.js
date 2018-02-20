const Router = require('koa-router')
const router = new Router()

const admin = require('./admin')
const article = require('./article')

module.exports = app => {
  router.use('/api/admin', admin.routes(), admin.allowedMethods())
  router.use('/api/article', article.routes(), article.allowedMethods())

  app.use(router.routes())
  app.use(router.allowedMethods())
}
