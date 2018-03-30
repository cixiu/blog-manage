import * as React from 'react'
import { Table } from 'antd'
import { IAdminInfo } from '../../store/admin-info'

// import * as styles from './index.scss'
// import { TableProps } from 'antd/lib/table'
import { PaginationProps } from 'antd/lib/pagination'
export { PaginationProps }

interface IColumn {
  title: string
  dataIndex: string
  width: string
}

interface IProps {
  title: string
  total: number
  columns: IColumn[]
  dataSource: IAdminInfo[]
  onChange?: (
    pagination: PaginationProps | boolean,
    filters: string[],
    sorter: object
  ) => any
}

class UserList extends React.Component<IProps, {}> {
  render() {
    // const columns = [
    //   {
    //     title: 'ID',
    //     dataIndex: 'id',
    //     width: '10%'
    //   },
    //   {
    //     title: '用户名',
    //     dataIndex: 'user_name',
    //     width: '20%'
    //   },
    //   {
    //     title: '管理员类型',
    //     dataIndex: 'admin',
    //     width: '20%'
    //   },
    //   {
    //     title: '注册时间',
    //     dataIndex: 'create_time',
    //     width: '20%'
    //   },
    //   {
    //     title: '注册地址',
    //     dataIndex: 'create_address',
    //     width: '30%'
    //   }
    // ]
    const { title, dataSource, total, onChange, columns } = this.props

    return (
      <Table
        rowKey="id"
        title={() => title}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          total,
          showTotal: totalNumber => `共 ${totalNumber} 条`
        }}
        bordered
        onChange={onChange}
      />
    )
  }
}

export default UserList
