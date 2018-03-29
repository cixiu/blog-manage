const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true },
  id: { type: Number },
  avatar: { type: String, default: '' },
  createAt: { type: Number },
  create_time: { type: String },
  create_address: { type: String }
})

const commentObj = {
  content: { type: String },
  createAt: { type: Number },
  id: { type: Number, default: 0 }, // 评论的id
  likedUser: [userSchema],
  isLiked: { type: Boolean, default: false },
  likesCount: { type: Number, default: 0 },
  respComment: { type: String, default: '' }, // 对文章评论用户进行评论用户的id
  respUserId: { type: Number, default: 0 },
  respUserInfo: { },
  topComment: { type: Array, default: [] }, // 评论的评论列表
  subCount: { type: Number, default: 0 },
  updateAt: { type: String },
  userId: { type: Number }, // 对文章进行评论的用户id
  userInfo: { type: Object }
}

const subCommentSchema = new Schema(commentObj, {
  _id: false
})

const commentSchema = new Schema(
  {
    ...commentObj,
    subComments: [subCommentSchema]
  },
  { _id: false }
)

const commentsSchema = new Schema({
  count: { type: Number, default: 0 },
  articleId: { type: Number },  // 文章的id
  comments: [commentSchema]
})

const Comments = mongoose.model('Comments', commentsSchema)

module.exports = Comments
