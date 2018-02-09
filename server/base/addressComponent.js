const axios = require('axios')
const BaseComponent = require('./baseComponent')
const ERR_OK = '1'

class AddressComponent extends BaseComponent {
  constructor() {
    super()
    this.gaodekey = '16809cb6982af3530e83816c7c6d58ce'
  }
  // 根据ip地址获取地址
  async guessPosition(req) {
    return new Promise(async (resolve, reject) => {
      let ip =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
      const ipArr = ip.split(':')
      ip = ipArr[ipArr.length - 1]
      if (process.env.NODE_ENV == 'development') {
        ip = '175.10.241.243'
      }
      try {
        let result

        result = await this.fetch('http://restapi.amap.com/v3/ip', {
          ip,
          key: this.gaodekey
        })
        if (result.data.status === ERR_OK) {
          const cityInfo = {
            adcode: result.data.adcode,
            province: result.data.province,
            city: result.data.city,
            rectangle: result.data.rectangle
          }
          resolve(cityInfo)
        } else {
          reject('定位失败')
        }
      } catch (err) {
        reject('定位失败')
      }
    })
  }
}

module.exports = AddressComponent
