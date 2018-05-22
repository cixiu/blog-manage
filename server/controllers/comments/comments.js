const ArticleModel = require('../../models/article/article')
const CommentsModel = require('../../models/comments/comments')
const UserModel = require('../../models/user/user')
const baseComponent = require('../../base/baseComponent')
const md5 = require('md5')
const dateFormat = require('dateformat')
const Ids = require('../../models/ids')

// const clean = async () => {
//   // await AdminModel.remove()
//   await ArticleModel.remove()
//   await CommentsModel.remove()
//   const ids = await Ids.findOne()
//   ids.article_id = 0
//   const IDs = await ids.save()
//   console.log(IDs)
// }
// clean()

class Comments extends baseComponent {
  // 创造评论
  async create(ctx, next) {
    if (!ctx.cookies.get('userId')) {
      ctx.body = {
        code: 1,
        message: 'No Permission'
      }
      return
    }
    const { articleId } = ctx.params
    const { userId, content } = ctx.request.body
    try {
      if (!Number(articleId) || !Number(userId) || !content) {
        ctx.body = {
          code: 1,
          message: '参数错误'
        }
      } else {
        const [articleComments, userInfo, articleDetail] = await Promise.all([
          CommentsModel.findOne({ articleId: Number(articleId) }),
          UserModel.findOne({ id: Number(userId) }, '-__v -_id -password'),
          ArticleModel.findOne({ id: Number(articleId) })
        ])
        if (!articleComments || !userInfo || !articleDetail) {
          ctx.body = {
            code: 1,
            message: '没有找到对应的数据'
          }
          return
        }
        articleComments.count++
        articleDetail.comment_count++
        const comment = {
          content,
          createAt: +new Date(),
          id: articleComments.comments.length + 1,
          respUserInfo: {
            id: 0, // id=0 表示的是作者 评论开始是针对文章的作者
            blogUser: articleDetail.author
          },
          updateAt: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
          userId: Number(userId),
          userInfo
        }
        articleComments.comments.push(comment)
        await Promise.all([articleComments.save(), articleDetail.save()])
        const res = articleComments.comments.find((item, index) => {
          return item.id === articleComments.comments.length
        })
        ctx.body = {
          code: 0,
          data: res
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        message: '评论发布失败'
      }
    }
  }
  // 文章的评论列表
  async getArticleComments(ctx, next) {
    const { articleId } = ctx.params
    const { userId } = ctx.query
    try {
      if (!Number(articleId)) {
        throw new Error('没有找到对应文章')
      }
      const articleComments = await CommentsModel.findOne(
        { articleId: Number(articleId) },
        '-__v -_id'
      )
      if (Number(userId)) {
        for (const comment of articleComments.comments) {
          const index = comment.likedUser.findIndex(
            (item, index) => item.id === Number(userId)
          )
          if (index > -1) {
            comment.isLiked = true
          } else {
            comment.isLiked = false
          }
        }
      }
      ctx.body = {
        code: 0,
        data: articleComments
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        message: '获取文章评论失败'
      }
    }
  }
  // 点赞评论
  async likeComment(ctx, next) {
    if (!ctx.cookies.get('userId')) {
      ctx.body = {
        code: 1,
        message: 'No Permission'
      }
      return
    }
    const { articleId } = ctx.params
    const { commentId, userId } = ctx.request.body
    try {
      if (!Number(commentId)) {
        throw new Error('没有找到对应的评论')
      }
      if (!Number(userId)) {
        ctx.body = {
          code: 1,
          message: '请先登录再点赞'
        }
        return
      }
      const [articleComments, userInfo] = await Promise.all([
        CommentsModel.findOne({ articleId: Number(articleId) }),
        UserModel.findOne({ id: Number(userId) }, '-__v -_id -password')
      ])
      for (const comment of articleComments.comments) {
        if (comment.id === Number(commentId)) {
          const index = comment.likedUser.findIndex(
            (item, index) => item.id === Number(userId)
          )
          if (index > -1) {
            comment.likedUser = comment.likedUser.filter(
              user => user.id !== Number(userId)
            )
            comment.likesCount = comment.likedUser.length
            await articleComments.save()
            ctx.body = {
              code: 0,
              isLiked: false,
              likesCount: comment.likesCount,
              message: '取消点赞成功'
            }
          } else {
            comment.likedUser.push(userInfo)
            comment.likesCount = comment.likedUser.length
            await articleComments.save()
            ctx.body = {
              code: 0,
              isLiked: true,
              likesCount: comment.likesCount,
              message: '点赞成功'
            }
          }
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        message: '点赞失败'
      }
    }
  }
  // 回复评论
  async replyComment(ctx, next) {
    if (!ctx.cookies.get('userId')) {
      ctx.body = {
        code: 1,
        message: 'No Permission'
      }
      return
    }
    const articleId = Number(ctx.params.articleId)
    const commentId = Number(ctx.params.commentId)
    const userId = Number(ctx.params.userId)
    const respUserId = Number(ctx.params.respUserId)
    const { content, isReply = false } = ctx.request.body
    try {
      if (!articleId || !userId || !respUserId || !content) {
        ctx.body = {
          code: 1,
          message: '参数错误'
        }
      } else {
        const [
          articleComments,
          userInfo,
          respUserInfo,
          articleDetail
        ] = await Promise.all([
          CommentsModel.findOne({ articleId }),
          UserModel.findOne({ id: userId }, '-__v -_id -password'),
          UserModel.findOne({ id: respUserId }, '-__v -_id -password'),
          ArticleModel.findOne({ id: articleId })
        ])
        // 评论的评论或者回复
        for (const comment of articleComments.comments) {
          if (comment.id === commentId) {
            comment.subComments.push({
              content,
              createAt: +new Date(),
              id: comment.subComments.length + 1,
              respComment: isReply ? true : false,
              respUserId: respUserInfo.id,
              respUserInfo,
              updateAt: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
              userId: Number(userId),
              userInfo
            })
            comment.subCount = comment.subComments.length
          }
        }
        articleComments.count++
        articleDetail.comment_count++
        const [comments] = await Promise.all([
          articleComments.save(),
          articleDetail.save()
        ])
        const selectComment = comments.comments.find((item, index) => {
          return item.id === commentId
        })
        ctx.body = {
          code: 0,
          data: selectComment.subComments
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        message: '评论回复失败'
      }
    }
  }
}

module.exports = new Comments()
