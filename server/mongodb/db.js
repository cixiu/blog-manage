const mongoose = require('mongoose')
const config = require('../../config/index')
const db_url = config.server.db_url
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
