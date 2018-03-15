const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  category: [{
    title: String
  }],
  title: { type: String, require: true },
  screenshot: { type: String },
  content: { type: String, require: true },
  description: { type: String, require: true },
  author: { type: String, default: 'cixiu' },
  id: { type: Number }, // 文章的id
  create_time: { type: String },
  last_update_time: { type: String },
  views_count: { type: Number, default: 0 },
  comment_count: { type: Number, default: 0 }
})

const commentsSchema = new Schema({
  comments: [
    {
      connent: { type: String },
      createAt: { type: String },
      id: { type: String }, // 评论的id
      isLiked: { type: Boolean, default: false },
      likesCount: { type: Number, default: 0 },
      respComment: { type: String, default: '' }, // 对文章评论用户进行评论用户的id
      respUser: { type: String }, // 对文章进行评论的用户id
      subCount: { type: Number, default: 0 },
      topComment: { type: Array, default: [] }, // 评论的评论列表
      updateAt: { type: String },
      userId: { type: String }
    }
  ],
  count: { type: Number },
  targetId: { type: Number } // 文章的id
})

articleSchema.index({ id: 1 })
const Article = mongoose.model('Article', articleSchema)
const Comments = mongoose.model('Comments', commentsSchema)

module.exports = { Article, Comments }
