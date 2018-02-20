const { Article: ArticleModel } = require('../../models/article/article')
const AdminModel = require('../../models/admin/admin')
const baseComponent = require('../../base/baseComponent')
const md5 = require('md5')
const dateFormat = require('dateformat')

class Article extends baseComponent {
  constructor() {
    super()
    this.create = this.create.bind(this)
  }
  // 创建文章
  async create(ctx, next) {
    const { categorys, title, screenshot, content } = ctx.request.body
    // console.log(ctx.session)
    try {
      const { admin_id } = ctx.session
      const admin = await AdminModel.findOne({ id: admin_id })
      // 只有超级管理员才能发布文章
      if (admin.type === 0 ) {
        const article_id = await this.getId('article_id')
        const time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
        const newArticleInfo = {
          category: categorys,
          title,
          screenshot,
          content,
          author: admin.user_name,
          id: article_id,
          create_time: time,
          last_update_time: time
        }
        await ArticleModel.create(newArticleInfo)
        ctx.body = {
          code: 0,
          message: '文章发布成功!'
        }
      }
      // 普通管理员不能发布文章
      if (admin.type === 1) {
        ctx.body = {
          code: 1,
          message: '您不是超级管理员，不能发布文章!'
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        message: '文章发布失败!'
      }
    }
  }
  // 文章列表
  async getArticleList(ctx, next) {
    const { limit = 10, offset = 0 } = ctx.query
    try {
      const articleList = await ArticleModel.find({}, '-_id -__v')
        .sort({ id: -1 })
        .skip(Number(offset))
        .limit(Number(limit))
      ctx.body = {
        code: 0,
        data: articleList
      }
    } catch (err) {
      console.log('获取文章列表失败', err)
      ctx.body = {
        code: 1,
        message: '获取文章列表失败'
      }
    }
  }
  // 文章总数
  async getArticleCount(ctx, next) {
    try {
      const count = await ArticleModel.count()
      ctx.body = {
        code: 0,
        count
      }
    } catch (err) {
      console.log('获取文章列表数量失败', err)
      ctx.body = {
        code: 1,
        message: '获取文章列表数量失败'
      }
    }
  }
}

module.exports = new Article()
