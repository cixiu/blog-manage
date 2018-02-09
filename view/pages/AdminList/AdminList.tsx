import * as React from 'react'
import { message } from 'antd'
import CommonUserList, {
  PaginationProps
} from '../../components/CommonUserList/CommonUserList'
import { getAdminList, getAdminCount } from '../../api/admin'

class UserList extends React.Component {
  state = {
    adminList: [],
    adminCount: 0,
    limit: 10,
    offset: 0
  }
  async componentDidMount() {
    const { limit, offset } = this.state
    const promises = [getAdminList({ limit, offset }), getAdminCount()]
    const [resAdminList, resAdminCount] = await Promise.all(promises)
    if (resAdminCount.code === 0) {
      this.setState({
        adminCount: resAdminCount.count
      })
    }
    if (resAdminList.code === 0) {
      this.setState({
        adminList: resAdminList.data
      })
    } else {
      message.error(resAdminList.message)
    }
  }

  getAdminList = async ({limit, offset}: {limit: number; offset: number}) => {
    const resAdminList = await getAdminList({ limit, offset })
    if (resAdminList.code === 0) {
      this.setState({
        adminList: resAdminList.data
      })
    }
  }

  handleChange = (pagination: PaginationProps, filters: string[], sorter: object) => {
    const {limit} = this.state
    const offset = ((pagination.current) as number - 1) * limit
    this.getAdminList({limit, offset})
  }
  render() {
    const { adminCount, adminList } = this.state
    return (
      <CommonUserList
        title="用户列表"
        total={adminCount}
        dataSource={adminList}
        onChange={this.handleChange}
      />
    )
  }
}

export default UserList
