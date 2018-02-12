import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { ClickParam } from 'antd/lib/menu'

import * as styles from './index.scss'

const { Sider } = Layout

interface IProps extends RouteComponentProps<any> {}

class Msider extends React.Component<IProps, {}> {
  state = {
    siderList: [
      { key: '/admin_list', type: 'team', text: '管理员列表' },
      { key: '/user_list', type: 'user', text: '用户列表' },
      { key: '/create_topic', type: 'form', text: '发布文章' },
      { key: '/topic_list', type: 'table', text: '文章列表' }
    ]
  }

  selectItem = ({ key }: ClickParam) => {
    this.props.history.push(`${key}`)
  }

  render() {
    const { siderList } = this.state
    const selectedKey = this.props.location.pathname

    return (
      <Sider className={styles.sider}>
        <div className={styles.logo}>辞修的博客</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={this.selectItem}
        >
          {siderList.map(item => (
            <Menu.Item key={item.key}>
              <Icon type={item.type} />
              <span>{item.text}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(Msider)
