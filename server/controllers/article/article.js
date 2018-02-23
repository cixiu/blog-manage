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
    try {
      const { admin_id } = ctx.session
      const admin = await AdminModel.findOne({ id: admin_id })
      // 只有超级管理员才能发布文章
      if (admin.type === 0) {
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
  // 删除文章
  async deleteArticle(ctx, next) {
    const { id } = ctx.query
    try {
      const { admin_id } = ctx.session
      const admin = await AdminModel.findOne({ id: admin_id })
      const article = await ArticleModel.findOne({ id })
      if (!article.id) {
        ctx.body = {
          code: 1,
          message: '没有找到该文章'
        }
      }
      if (admin.type === 0) {
        await ArticleModel.deleteOne({ id })
        ctx.body = {
          code: 0,
          message: '文章删除成功!!!'
        }
      }
      // 普通管理员不能操作文章
      if (admin.type === 1) {
        ctx.body = {
          code: 1,
          message: '普通管理员不能操作文章'
        }
      }
    } catch (err) {
      console.log('删除失败', err)
      ctx.body = {
        code: 1,
        message: '删除失败'
      }
    }
  }
  // 文章详情
  async getArticleDetail(ctx, next) {
    const { id, update } = ctx.query
    try {
      const article = await ArticleModel.findOne({ id }, '-_id -__v')
      if (!article) {
        throw new Error('没有找到对应的文章')
      }
      if (!update) {
        const updateViewsCount = article.views_count + 1
        await ArticleModel.findOneAndUpdate(
          { id },
          { $set: { views_count: updateViewsCount } }
        )
      }
      ctx.body = {
        code: 0,
        data: article
      }
    } catch (err) {
      console.log('没有找到对应的文章', err)
      ctx.body = {
        code: 1,
        message: '没有找到对应的文章'
      }
    }
  }
  // 修改文章
  async updateArticle(ctx, next) {
    const { categorys, title, screenshot, content, id } = ctx.request.body
    const last_update_time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
    const newData = { categorys, title, screenshot, content, last_update_time }
    try {
      if (!id) {
        throw new Error('请传入要更新的文章的id')
      }
      const { admin_id } = ctx.session
      const admin = await AdminModel.findOne({ id: admin_id })
      if (admin.type === 0) {
        await ArticleModel.findOneAndUpdate({ id }, { $set: newData })
        ctx.body = {
          code: 0,
          message: '更新文章成功!!'
        }
      }
      if (admin.type === 1) {
        ctx.body = {
          code: 1,
          message: '您没有修改文章的权限'
        }
      }
    } catch (err) {
      console.log('更新文章失败', err)
      ctx.body = {
        code: 1,
        message: '更新文章失败!!'
      }
    }
  }
}

module.exports = new Article()
