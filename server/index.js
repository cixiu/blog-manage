const Koa = require('koa')
const session = require('koa-session')
const koaBody = require('koa-body')
const config = require('../config/index')
const db = require('./mongodb/db')
const router = require('./routes')

const port = config.server.port || process.env.PORT
const app = new Koa()

app.keys = ['this is a blog manage system writed by cixiu']
const SESSION_CONFIG = {
  key: 'SID',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  overwrite: true,
  signed: true
}
app.use(session(SESSION_CONFIG, app))
app.use(koaBody())

router(app)

app.listen(port, err => {
  if (!err) {
    console.log(`Server is running at ${port}`)
  }
})
