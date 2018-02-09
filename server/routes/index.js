const Router = require('koa-router')
const router = new Router()

const admin = require('./admin')

module.exports = app => {
  router.use('/api/admin', admin.routes(), admin.allowedMethods())

  app.use(router.routes())
  app.use(router.allowedMethods())
}
