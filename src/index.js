import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import configureStore from './store/configureStore'

import App from './components/App'
import TicketsList from './components/Tickets/TicketsList'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route
          path='/'
          components={{ main: TicketsList }}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
