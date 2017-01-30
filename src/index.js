import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import configureStore from './store/configureStore'

import App from './components/App'
import TicketsList from './components/Tickets/TicketsList'
import LoginPage from './containers/LoginPage'

import { appInitialize } from './actions/AppActions'
import { loginPageEnter } from './actions/SessionsActions'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} onEnter={appInitialize(store.dispatch)}>
        <Route
          path='/'
          components={{ main: TicketsList }}
        />
      </Route>
      <Route
        path='/login'
        component={LoginPage}
        onEnter={loginPageEnter()}
      />
    </Router>
  </Provider>,
  document.getElementById('root')
)
