import * as React from 'react'
import { Table } from 'antd'

import * as styles from './index.scss'
// import { ColumnProps } from 'antd/lib/table'

// interface IUser {
//   key: number;
//   name: string;
// }

class UserList extends React.Component {
  state = {
    dataSource: [
      {
        key: '1',
        id: '1',
        name: 'John Brown',
        create_time: `${new Date()}`,
        address: 'New York No. 1 Lake Park'
      },
      {
        key: '2',
        id: '2',
        name: 'Jim Green',
        create_time: `${new Date()}`,
        address: 'London No. 1 Lake Park'
      },
      {
        key: '3',
        id: '3',
        name: 'Joe Black',
        create_time: `${new Date()}`,
        address: 'Sidney No. 1 Lake Park'
      },
      {
        key: '4',
        id: '4',
        name: 'Joe Love',
        create_time: `${new Date()}`,
        address: '上海'
      }
    ]
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'name'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time'
      },
      {
        title: '注册地址',
        dataIndex: 'address'
      }
    ]

    return (
      <div className={styles.userList}>
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          bordered
        />
      </div>
    )
  }
}

export default UserList
