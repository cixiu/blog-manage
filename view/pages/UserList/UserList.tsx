import * as React from 'react'
import { message } from 'antd'
import CommonUserList, {
  PaginationProps
} from '../../components/CommonUserList/CommonUserList'
import { getUserList, getUserCount } from '../../api/user'

class UserList extends React.Component {
  state = {
    userList: [],
    userCount: 0,
    limit: 10,
    offset: 0,
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '10%'
      },
      {
        title: '用户名',
        dataIndex: 'username',
        width: '30%'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        width: '30%'
      },
      {
        title: '注册地址',
        dataIndex: 'create_address',
        width: '30%'
      }
    ]
  }
  async componentDidMount() {
    const { limit, offset } = this.state
    const promises = [getUserList({ limit, offset }), getUserCount()]
    const [resUserList, resUserCount] = await Promise.all(promises)
    if (resUserCount.code === 0) {
      this.setState({
        userCount: resUserCount.count
      })
    }
    if (resUserList.code === 0) {
      this.setState({
        userList: resUserList.data
      })
    } else {
      message.error(resUserList.message)
    }
  }

  getUserList = async ({limit, offset}: {limit: number; offset: number}) => {
    const resUserList = await getUserList({ limit, offset })
    if (resUserList.code === 0) {
      this.setState({
        userList: resUserList.data
      })
    }
  }

  handleChange = (pagination: PaginationProps, filters: string[], sorter: object) => {
    const {limit} = this.state
    const offset = ((pagination.current) as number - 1) * limit
    this.getUserList({limit, offset})
  }
  render() {
    const { userCount, userList, columns } = this.state
    return (
      <CommonUserList
        title="用户列表"
        total={userCount}
        columns={columns}
        dataSource={userList}
        onChange={this.handleChange}
      />
    )
  }
}

export default UserList
