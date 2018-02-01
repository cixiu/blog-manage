import * as React from 'react'
import { hot } from 'react-hot-loader'

import { Button } from 'antd'

import * as styles from './App.scss'

@hot(module)
class App extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary">Hello World!!</Button>
        <h1 className={styles.answer}>I am fine</h1>
        <h2 className={styles.barFoo}>这是一个标题</h2>
      </div>
    )
  }
}

export default App
