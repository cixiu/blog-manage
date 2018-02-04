import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import * as styles from './index.scss'

const { Sider } = Layout

interface IProps extends RouteComponentProps<any> {}

interface IMenuItem {
  key: string
  keyPath: string[]
}

class Msider extends React.Component<IProps, {}> {
  state = {
    siderList: [
      { key: '/user_list', type: 'user', text: '用户列表' },
      { key: '/create_topic', type: 'form', text: '发布文章' },
      { key: '/topic_list', type: 'table', text: '文章列表' }
    ]
  }

  selectItem = ({ key }: IMenuItem) => {
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
