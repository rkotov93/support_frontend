import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import configureStore from './store/configureStore'

import App from './containers/App'
import NoMatch from './components/shared/NoMatch'
import TicketsList from './components/Tickets/TicketsList'
import LoginPage from './containers/LoginPage'
import RegistrationPage from './components/Registrations/RegistrationPage'

import { appInitialize } from './actions/AppActions'
import { checkAuthentication } from './actions/SessionActions'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} onEnter={appInitialize(store.dispatch)}>
        <Route
          path='/'
          components={{ main: TicketsList }}
        />
        <Route path='*' components={{ main: NoMatch }}/>
      </Route>
      <Route
        path='/login'
        component={LoginPage}
        onEnter={checkAuthentication()}
      />
      <Route
        path='/registration'
        component={RegistrationPage}
        onEnter={checkAuthentication()}
      />
    </Router>
  </Provider>,
  document.getElementById('root')
)
