import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Table, message, Divider, Modal } from 'antd'

import { PaginationProps } from 'antd/lib/pagination'
import { getArticleList, getArticleCount, deleteArticle } from '../../api/article'

const confirm = Modal.confirm

interface IArticleData {
  category: string[]
  title: string
  screenshot: string
  content: string
  author: string
  id: number
  create_time: string
  last_update_time: string
  views_count: number
  comment_count: number
}
interface IProps extends RouteComponentProps<any> {}

class UserList extends React.Component<IProps, {}> {
  state = {
    articleList: [],
    articleCount: 0,
    limit: 10,
    offset: 0
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
  getArticleList = async ({
    limit,
    offset
  }: {
    limit: number
    offset: number
  }) => {
    const resArticleList = await getArticleList({ limit, offset })
    if (resArticleList.code === 0) {
      this.setState({
        articleList: resArticleList.data
      })
    }
  }

  handleChange = (
    pagination: PaginationProps,
    filters: string[],
    sorter: object
  ) => {
    const { limit } = this.state
    const offset = ((pagination.current as number) - 1) * limit
    this.getArticleList({ limit, offset })
  }

  handleDelete = (record: IArticleData) => {
    confirm({
      title: '您确定要删除这篇文章吗？',
      content: record.title,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const res = await deleteArticle(record.id)
        if (res.code === 0) {
          message.success(res.message)
          this.componentDidMount()
        }
        if (res.code === 1) {
          message.info(res.message)
        }
      }
    })
  }

  handleEditor = (record: IArticleData) => {
    this.props.history.push(`/article/editor/${record.id}`)
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
        width: '20%'
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'action',
        width: '10%',
        render: (text: any, record: IArticleData) => {
          return (
            <span>
              <a onClick={() => this.handleDelete(record)}>删除</a>
              <Divider type="vertical" />
              <a onClick={() => this.handleEditor(record)}>编辑</a>
            </span>
          )
        }
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
