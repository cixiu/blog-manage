import axios from 'axios'

interface IArticleParams {
  categorys: string
  title: string
  screenshot: string
  content: string
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
export const getArticleList = async ({limit = 10, offset = 0}) => {
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
