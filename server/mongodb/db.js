const mongoose = require('mongoose')
const config = require('../../config/index')

let db_url = config.server.db_url
if (process.env.NODE_ENV === 'production') {
  db_url = 'mongodb://blog_runner:cheng2869070@127.0.0.1:19999/blog'
}
mongoose.Promise = global.Promise
// 连接数据库
mongoose.connect(db_url)

const db = mongoose.connection
db.once('open', () => {
  console.log('连接数据库成功' + db_url)
})

db.on('error', (error) => {
  console.error('Error in MongoDb connection: ' + error)
  mongoose.disconnect()
})

db.on('close', () => {
  console.log('数据库断开，重新连接数据库')
  mongoose.connect(db_url)
})

module.exports = db
