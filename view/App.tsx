import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Msider from './components/Msider/Msider'
import Mheader from './components/Mheader/Mheader'
import AuthRoute from './components/AuthRoute/AuthRoute'
import Login from './pages/Login/Login'
import AdminList from './pages/AdminList/AdminList'
import UserList from './pages/UserList/UserList'
import CreateArticle from './pages/CreateArticle/CreateArticle'
import ArticleList from './pages/ArticleList/ArticleList'
import EditorArticle from './pages/EditorArticle/EditorArticle'

import { Layout } from 'antd'
const { Content } = Layout

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
                <Route path="/create_article" component={CreateArticle} />
                <Route path="/article_list" component={ArticleList} />
                <Route path="/article/editor/:id" component={EditorArticle} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
