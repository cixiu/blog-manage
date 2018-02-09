const axios = require('axios')
const Ids = require('../models/ids')

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
        'Accept': 'application/json',
        'Content-Type': 'pplication/json'
      }
    })
  }
}

module.exports = BaseComponent
