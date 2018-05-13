import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Layout, Input, Row, Col, Avatar, Dropdown, Menu, message } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { IStateStore } from '../../store/index'
import { IAdminInfo } from '../../store/admin-info'
import { logout } from '../../api/admin'
import * as styles from './index.scss'

const { Header } = Layout
const { Search } = Input

interface IProps extends RouteComponentProps<any> {}
interface IReduxProps extends IProps {
  adminInfo: IAdminInfo
}

class Mheader extends React.Component<IProps, {}> {
  get injected() {
    return this.props as IReduxProps
  }
  handleDropdown = async ({key}: ClickParam) => {
    if (key === 'home') {
      this.injected.history.push('/admin_list')
    } else if (key === 'logout') {
      const res = await logout()
      if (res.code === 0) {
        message.success(res.message)
        this.injected.history.push('/')
      } else {
        message.error(res.message)
      }
    }
  }
  render() {
    return (
      <Header>
        <Row type="flex" gutter={16}>
          <Col xs={0} sm={0} md={8} lg={8}>
            <Search
              className={styles.search}
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton={true}
            />
          </Col>
          <Col xs={0} sm={0} md={0} lg={8}>
            <a href="https://www.tzpcc.cn" target="_blank">
              博客地址: www.tzpcc.cn
            </a>
          </Col>
          <Col xs={24} sm={24} md={16} lg={8}>
            <div className={styles.user}>
              <Dropdown
                overlay={
                  <Menu onClick={this.handleDropdown}>
                    <Menu.Item key="home">首页</Menu.Item>
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </Menu>
                }
              >
                <Avatar icon="user" className={styles.avatar} />
              </Dropdown>
              <span>{this.injected.adminInfo.user_name}</span>
            </div>
          </Col>
        </Row>
      </Header>
    )
  }
}

const mapStateToProps = (state: IStateStore) => {
  return {
    adminInfo: state.adminInfo
  }
}

// const mergeProps = (
//   stateProps: object,
//   dispatchProps: object,
//   ownProps: object
// ) => {
//   return Object.assign({}, ownProps, stateProps, dispatchProps)
// }

export default withRouter(connect(mapStateToProps)(Mheader as any) as any)
