import axios from 'axios'

// 用户列表
export const getUserList = async ({limit = 10, offset = 0}) => {
  try {
    const res = await axios.get('/api/user/list', {
      params: {
        limit,
        offset
      }
    })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 用户数量
export const getUserCount = async () => {
  try {
    const res = await axios.get('/api/user/count')
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}
