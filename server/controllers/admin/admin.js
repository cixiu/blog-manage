const AdminModel = require('../../models/admin/admin')
const AddressComponent = require('../../base/addressComponent')
const md5 = require('md5')
const dateFormat = require('dateformat')

class Admin extends AddressComponent {
  constructor() {
    super()
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.md5 = this.md5.bind()
  }
  // 管理员注册
  async register(ctx, next) {
    console.log(ctx.req)
    const { user_name, password, super_secret } = ctx.request.body
    try {
      if (!user_name) {
        throw new Error('用户名不能为空')
      } else if (!password) {
        throw new Error('密码不能为空')
      }
    } catch (err) {
      console.log(err.message)
      ctx.body = {
        code: 1,
        message: err.message
      }
      return
    }
    try {
      const admin = await AdminModel.findOne({ user_name })
      if (admin) {
        console.log('用户名已存在')
        ctx.body = {
          code: 1,
          message: '用户名已存在'
        }
      } else {
        const adminType =
          super_secret === 'superSecret' ? '超级管理员' : '管理员'
        const admin_id = await this.getId('admin_id')
        const newPassword = this.md5(password)
        const newAdmin = {
          user_name,
          password: newPassword,
          type: super_secret === 'superSecret' ? 0 : 1,
          id: admin_id,
          create_time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
          admin: adminType
        }
        await AdminModel.create(newAdmin)
        ctx.session.admin_id = admin_id
        ctx.body = {
          code: 0,
          message: '注册管理员成功'
        }
      }
    } catch (err) {
      console.log('注册管理员失败', err)
      ctx.body = {
        code: 1,
        message: '注册管理员失败'
      }
    }
  }
  // 管理员登录
  async login(ctx, next) {
    const { user_name, password, super_secret } = ctx.request.body
    try {
      if (!user_name) {
        throw new Error('用户名不能为空')
      } else if (!password) {
        throw new Error('密码不能为空')
      }
    } catch (err) {
      console.log(err.message)
      ctx.body = {
        code: 1,
        message: err.message
      }
      return
    }
    const newPassword = this.md5(password)
    try {
      const admin = await AdminModel.findOne({ user_name })
      if (!admin) {
        const adminType =
          super_secret === 'superSecret' ? '超级管理员' : '管理员'
        const admin_id = await this.getId('admin_id')
        const addressInfo = await this.guessPosition(ctx.req)
        const create_address = `${addressInfo.province} ${addressInfo.city}`
        const newAdmin = {
          user_name,
          password: newPassword,
          type: super_secret === 'superSecret' ? 0 : 1,
          id: admin_id,
          create_time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
          create_address,
          admin: adminType
        }
        await AdminModel.create(newAdmin)
        ctx.session.admin_id = admin_id
        ctx.body = {
          code: 0,
          message: '注册管理员成功'
        }
      } else if (newPassword !== admin.password) {
        console.log('管理员登录密码错误')
        ctx.body = {
          code: 1,
          message: '用户名已经存在，但是登录密码错误'
        }
      } else {
        ctx.session.admin_id = admin.id
        ctx.body = {
          code: 0,
          message: '登录成功'
        }
      }
    } catch (err) {
      console.log('注册管理员失败', err)
      ctx.body = {
        code: 1,
        message: '注册管理员失败'
      }
    }
  }
  // 退出登录
  async logout(ctx, next) {
    try {
      delete ctx.session.admin_id
      ctx.body = {
        code: 0,
        message: '退出成功'
      }
    } catch (err) {
      console.log('退出失败', err)
      ctx.body = {
        code: 1,
        message: '退出失败'
      }
    }
  }
  // 密码加盐
  md5(password) {
    const newPassword = md5(md5(password + 'hello@web.com') + '132753skldf')
    return newPassword
  }
  // 获取管理员信息
  async getAdminInfo(ctx, next) {
    const { admin_id } = ctx.session
    if (!admin_id) {
      console.log('管理员的session失效或者未登录')
      ctx.body = {
        code: 1,
        message: '获取管理员信息失败'
      }
      return
    }
    try {
      const info = await AdminModel.findOne(
        { id: admin_id },
        '-_id -__v -password'
      )
      if (!info) {
        throw new Error('未找到管理员')
      } else {
        ctx.body = {
          code: 0,
          data: info
        }
      }
    } catch (err) {
      console.log('获取管理员信息失败')
      ctx.body = {
        code: 1,
        message: '获取管理员信息失败'
      }
    }
  }
  // 获取管理员列表
  async getAdminList(ctx, next) {
    const { limit = 10, offset = 0 } = ctx.query
    try {
      const adminList = await AdminModel.find({}, '-_id -__v -password')
        .sort({ id: -1 })
        .skip(Number(offset))
        .limit(Number(limit))
      ctx.body = {
        code: 0,
        data: adminList
      }
    } catch (err) {
      console.log('获取管理员列表失败', err)
      ctx.body = {
        code: 1,
        message: '获取管理员列表失败'
      }
    }
  }
  // 获取管理员总数
  async getAdminCount(ctx, next) {
    try {
      const count = await AdminModel.count()
      ctx.body = {
        code: 0,
        count
      }
    } catch (err) {
      console.log('获取管理员列表失败', err)
      ctx.body = {
        code: 1,
        message: '获取管理员数量失败'
      }
    }
  }
}

module.exports = new Admin()
