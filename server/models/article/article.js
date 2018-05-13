const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    title: String
  },
  { _id: false }
)

const articleSchema = new Schema({
  category: [categorySchema],
  title: { type: String, require: true },
  screenshot: { type: String },
  content: { type: String, require: true },
  description: { type: String, require: true },
  author: { type: String, default: 'cixiu' },
  id: { type: Number }, // 文章的id
  create_time: { type: String },
  last_update_time: { type: String },
  views_count: { type: Number, default: 0 },
  comment_count: { type: Number, default: 0 },
  is_test: { type: Boolean, default: false }  // 文章是否为测试分类
})

// const commentSchema = new Schema({
//   content: { type: String },
//   createAt: { type: Number },
//   id: { type: Number, default: 0 }, // 评论的id
//   isLiked: { type: Boolean, default: false },
//   likesCount: { type: Number, default: 0 },
//   respComment: { type: String, default: '' }, // 对文章评论用户进行评论用户的id
//   respUser: { type: String },
//   respUserInfo: { type: Object, default: {} },
//   subCount: { type: Number, default: 0 },
//   topComment: { type: Array, default: [] }, // 评论的评论列表
//   updateAt: { type: String },
//   userId: { type: Number }, // 对文章进行评论的用户id
//   userInfo: { type: Object }
// }, {
//   _id: false
// })

// const commentsSchema = new Schema({
//   count: { type: Number, default: 0 },
//   articleId: { type: Number }, // 文章的id
//   comments: {
//     type: [commentSchema],
//     default: []
//   }
// })

articleSchema.index({ id: 1 })
const Article = mongoose.model('Article', articleSchema)
// const Comments = mongoose.model('Comments', commentsSchema)

module.exports = Article
