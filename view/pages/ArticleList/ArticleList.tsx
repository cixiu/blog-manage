import * as React from 'react'
import { Table, message } from 'antd'

import { PaginationProps } from 'antd/lib/pagination'
import { getArticleList, getArticleCount } from '../../api/article'

class UserList extends React.Component {
  state = {
    articleList: [],
    articleCount: 0,
    limit: 10,
    offset: 0,
  }
  async componentDidMount() {
    const { limit, offset } = this.state
    const promises = [getArticleList({ limit, offset }), getArticleCount()]
    const [resArticleList, resArticleCount] = await Promise.all(promises)
    if (resArticleCount.code === 0) {
      this.setState({
        articleCount: resArticleCount.count
      })
    }
    if (resArticleList.code === 0) {
      this.setState({
        articleList: resArticleList.data
      })
    } else {
      message.error(resArticleList.message)
    }
  }
  getArticleList = async ({limit, offset}: {limit: number; offset: number}) => {
    const resArticleList = await getArticleList({ limit, offset })
    if (resArticleList.code === 0) {
      this.setState({
        articleList: resArticleList.data
      })
    }
  }

  handleChange = (pagination: PaginationProps, filters: string[], sorter: object) => {
    const {limit} = this.state
    const offset = ((pagination.current) as number - 1) * limit
    this.getArticleList({limit, offset})
  }
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '10%'
      },
      {
        title: '文章标题',
        dataIndex: 'title',
        width: '40%'
      },
      {
        title: '阅读数量',
        dataIndex: 'views_count',
        width: '10%'
      },
      {
        title: '评论数量',
        dataIndex: 'comment_count',
        width: '10%'
      },
      {
        title: '发布时间',
        dataIndex: 'create_time',
        width: '30%'
      }
    ]
    const { articleList, articleCount: total } = this.state

    return (
      <Table
        rowKey="id"
        title={() => '文章列表'}
        dataSource={articleList}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          total,
          showTotal: totalNumber => `共 ${totalNumber} 条`
        }}
        bordered
        onChange={this.handleChange}
      />
    )
  }
}

export default UserList
