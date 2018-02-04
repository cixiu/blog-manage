import * as React from 'react'

import { Layout, Input, Row, Col } from 'antd'
import * as styles from './index.scss'

const { Header } = Layout
const { Search } = Input

class Mheader extends React.Component {
  render() {
    return (
      <Header>
        <Row type="flex" gutter={16}>
          <Col xs={24} sm={20} md={16} lg={8}>
            <Search
              className={styles.search}
              placeholder="input search text"
              onSearch={value => console.log(value)}
              enterButton={true}
            />
          </Col>
          <Col xs={0} sm={0} md={0} lg={8}>
            <a href="https://www.baidu.com" target="_blank">
              百度地址: www.baidu.com
            </a>
          </Col>
          <Col xs={0} sm={4} md={8} lg={8}>
            <div className={styles.user}>用户</div>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default Mheader
