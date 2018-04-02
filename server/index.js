const Koa = require('koa')
const session = require('koa-session')
const koaBody = require('koa-body')
const path = require('path')
const config = require('../config/index')
const db = require('./mongodb/db')
const router = require('./routes')

const port = config.server.port || process.env.PORT
const app = new Koa()

// 设置CORS
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin || '*')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  )
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true) //可以带cookies
  ctx.set('X-Powered-By', '3.2.1')
  if (ctx.method == 'OPTIONS') {
    ctx.status = 200
  } else {
    await next()
  }
})

app.keys = ['this is a blog manage system writed by cixiu']
const SESSION_CONFIG = {
  key: 'SID',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  overwrite: true,
  signed: true
}
app.use(session(SESSION_CONFIG, app))
app.use(
  koaBody({
    formLimit: 1024 * 1024,
    textLimit: 1024 * 1024,
    multipart: true,
    formidable: {
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../public/images'),
      onFileBegin: (name, file) => {
        file.path = path.join(__dirname, '../public/images/' + file.name)
      }
    }
  })
)

router(app)

if (process.env.NODE_ENV === 'production') {
  const Static = require('koa-static')
  const convert = require('koa-convert')
  const historyApiFallback = require('koa-connect-history-api-fallback')
  app.use(convert(historyApiFallback()))
  app.use(Static(path.join(__dirname, '../dist')))
}

app.listen(port, err => {
  if (!err) {
    console.log(`Server is running at ${port}`)
  }
})
