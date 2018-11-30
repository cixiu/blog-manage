const Koa = require('koa')
const Static = require('koa-static')
const proxy = require('koa-proxy')
const convert = require('koa-convert')
const historyApiFallback = require('koa-connect-history-api-fallback')
const app = new Koa()

const proxyHost = 'http://localhost:9002'
app.use(
  convert(
    proxy({
      host: proxyHost,
      match: /^\/api\//
    })
  )
)

app.use(convert(historyApiFallback()))
app.use(Static('./dist'))

const port = 9003
app.listen(port, err => {
  if (!err) {
    console.log(`Server is running at ${port}`)
  }
})
