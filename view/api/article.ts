import axios from 'axios'

interface IArticleParams {
  categorys: string
  title: string
  screenshot: string
  content: string
  description: string
  id?: number
}

// 创建文章
export const createArticle = async (data: IArticleParams) => {
  try {
    const res = await axios.post('/api/article/create', data)
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 获取文章列表
export const getArticleList = async ({ limit = 10, offset = 0 }) => {
  try {
    const res = await axios.get('/api/article/list', {
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
// 文章总数量
export const getArticleCount = async () => {
  try {
    const res = await axios.get('/api/article/count')
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 删除文章
export const deleteArticle = async (id: number) => {
  try {
    const res = await axios.get('/api/article/delete', {
      params: { id }
    })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 获取对应文章详情
export const getArticleDetail = async (id: number, update = true) => {
  try {
    const res = await axios.get('/api/article/detail', {
      params: { id, update }
    })
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}

// 更新对应文章
export const updateArticle = async (data: IArticleParams) => {
  try {
    const res = await axios.post('/api/article/update', data)
    return Promise.resolve(res.data)
  } catch (err) {
    console.log(err)
  }
}
