const axios = require('axios')
const qiniu = require('qiniu')
const dateFormat = require('dateformat')
const path = require('path')
const Ids = require('../models/ids')

const baseUrl = 'https://blog.image.tzpcc.cn'
qiniu.conf.ACCESS_KEY = 'uzq4hVSsnTdlKvDIJ7mCq_A2ugsbk2Jn-SSpdTBE'
qiniu.conf.SECRET_KEY = 'iGO_mnUZhSLwLNaagmL6g-TKLqIeqFJ1Ny5Pw1cg'

class BaseComponent {
  constructor() {
    this.idList = ['admin_id', 'user_id', 'article_id', 'img_id']
    this.uploadImg = this.uploadImg.bind(this)
    this.qiniu = this.qiniu.bind(this)
  }
  async getId(type) {
    if (this.idList.indexOf(type) === -1) {
      console.log('id类型错误')
      throw new Error('id类型错误')
      return
    }
    try {
      const idData = await Ids.findOne()
      if (!idData[type]) {
        idData[type] = 0
      }
      idData[type]++
      await idData.save()
      return idData[type]
    } catch (err) {
      console.log('获取ID数据失败')
      throw new Error(err)
    }
  }
  async fetch(url = '', data = {}, type = 'GET') {
    return axios({
      url,
      method: type.toUpperCase(),
      params: data,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
  async uploadImg(ctx, next) {
    // console.log(ctx.request.body.files)
    try {
      const image = await this.qiniu(ctx)
      ctx.body = {
        code: 0,
        image: {
          ...image,
          url: `${baseUrl}/${image.key}`
        }
      }
    } catch (err) {
      console.log(err)
      ctx.body = {
        code: 1,
        message: '上传图片失败'
      }
    }
  }
  async qiniu(ctx) {
    return new Promise(async (resolve, reject) => {
      const { files } = ctx.request.body
      const time = +new Date()
      const img_id = await this.getId('img_id')
      const randomImgId = (time + Math.ceil(Math.random() * 10000)).toString(16)
      const file = files.image || files.file
      const localFile = file.path
      const key =
        dateFormat(time, 'yyyy/mm/dd') +
        '/' +
        time +
        '/' +
        randomImgId
        // path.extname(localFile)
      try {
        const token = this.uptoken('blog', key)
        const qiniuImg = await this.uploadFile(token, key, localFile)
        resolve(qiniuImg)
      } catch (err) {
        console.log('保存至七牛云失败', err)
        reject('保存至七牛云失败')
      }
    })
  }
  uptoken(bucket, key) {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket + ':' + key
    })
    return putPolicy.uploadToken()
  }
  uploadFile(uptoken, key, localFile) {
    return new Promise((resolve, reject) => {
      const formUploader = new qiniu.form_up.FormUploader()
      const extra = new qiniu.form_up.PutExtra()
      formUploader.putFile(uptoken, key, localFile, extra, function(err, ret, info) {
        if (!err) {
          // console.log(ret)
          // console.log(info)
          resolve(ret)
        } else {
          console.log('图片上传至七牛失败', err)
          reject(err)
        }
      })
    })
  }
}

module.exports = BaseComponent
