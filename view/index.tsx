import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducers from './store'
import App from './App'

const initialState = {
  adminInfo: {}
}
interface IWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
declare const window: IWindow

const composeEnhancers =
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const store = createStore(
  rootReducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app') as HTMLElement
)
