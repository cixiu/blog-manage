import axios from 'axios'

// const ERR_OK = 0

export interface ILoginData {
  user_name: string
  password: string
  super_secret: string
}

// 管理员登录
export const login = async (data: ILoginData) => {
  try {
    const res = await axios.post('/api/admin/login', data)
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 管理员退出登录
export const logout = async () => {
  try {
    const res = await axios.get('/api/admin/logout')
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 管理员信息
export const getAdminInfo = async () => {
  try {
    const res = await axios.get('/api/admin/info')
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 管理员列表
export const getAdminList = async ({limit = 10, offset = 0}) => {
  try {
    const res = await axios.get('/api/admin/list', {
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

// 管理员数量
export const getAdminCount = async () => {
  try {
    const res = await axios.get('/api/admin/count')
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}
