const axios = require('axios')
const qiniu = require('qiniu')
const dateFormat = require('dateformat')
const Ids = require('../models/ids')

qiniu.conf.ACCESS_KEY = 'uzq4hVSsnTdlKvDIJ7mCq_A2ugsbk2Jn-SSpdTBE'
qiniu.conf.SECRET_KEY = 'iGO_mnUZhSLwLNaagmL6g-TKLqIeqFJ1Ny5Pw1cg'

class BaseComponent {
  constructor() {
    this.idList = ['admin_id', 'user_id', 'topic_id']
  }
  async getId(type) {
    if (this.idList.indexOf(type) === -1) {
      console.log('id类型错误')
      throw new Error('id类型错误')
      return
    }
    try {
      const idData = await Ids.findOne()
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
        'Content-Type': 'pplication/json'
      }
    })
  }
  async uploadImg(ctx, next) {}
  async qiniu() {
    const time = + new Date()
    const key = dateFormat(time, 'yyyy/mm/dd') + '/' + time
    try {
      const token = this.uptoken('blog', key)
      // const qiniuImg = await this.uploadFile(token, key, )
    } catch (err) {}
  }
  uptoken(bucket, key) {
    let putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
    return putPolicy.token()
  }
  uploadFile(uptoken, key, localFile) {
    return new Promise((resolve, reject) => {
      var extra = new qiniu.io.PutExtra()
      qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if (!err) {
          resolve(ret.key)
        } else {
          console.log('图片上传至七牛失败', err)
          reject(err)
        }
      })
    })
  }
}

module.exports = BaseComponent
