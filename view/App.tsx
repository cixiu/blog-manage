import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Msider from './components/Msider/Msider'
import Mheader from './components/Mheader/Mheader'
import AuthRoute from './components/AuthRoute/AuthRoute'
import Login from './pages/Login/Login'
import AdminList from './pages/AdminList/AdminList'
import UserList from './pages/UserList/UserList'
import CreateTopic from './pages/CreateTopic/CreateTopic'
import TopicList from './pages/TopicList/TopicList'

import { Layout } from 'antd'
const { Content } = Layout

// import * as styles from './App.scss'

@hot(module)
class App extends React.Component {
  render() {
    return (
      <div>
        <AuthRoute />
        <Layout>
          <Msider />
          <Layout style={{ marginLeft: 200, height: '100vh' }}>
            <Mheader />
            <Content style={{ padding: '40px', background: '#fff' }}>
              <Switch>
                <Route path="/" exact render={() => <Redirect to="/login" />} />
                <Route path="/login" component={Login} />
                <Route path="/admin_list" component={AdminList} />
                <Route path="/user_list" component={UserList} />
                <Route path="/create_topic" component={CreateTopic} />
                <Route path="/topic_list" component={TopicList} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
