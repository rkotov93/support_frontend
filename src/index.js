import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import configureStore from './store/configureStore'

import App from './containers/App'
import NoMatch from './components/shared/NoMatch'

import LoginPage from './containers/LoginPage'
import RegistrationPage from './components/Registrations/RegistrationPage'

import TicketsList from './containers/TicketsList'
import TicketPage from './containers/TicketPage'
import NewTicketPage from './containers/NewTicketPage'
import EditTicketPage from './containers/EditTicketPage'

import UsersList from './containers/UsersList'

import { appInitialize } from './actions/AppActions'
import { checkAuthentication } from './actions/SessionActions'

import { ticketsListEnter, ticketPageEnter, ticketsListChange, editTicketPageEnter } from './actions/TicketsActions'
import { usersListEnter, usersListChange } from './actions/UsersActions'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        path="/login"
        component={LoginPage}
        onEnter={checkAuthentication()}
      />
      <Route
        path="/registration"
        component={RegistrationPage}
        onEnter={checkAuthentication()}
      />

      <Route component={App} onEnter={appInitialize(store.dispatch)}>
        <Route
          path="/"
          components={{ main: TicketsList }}
          onEnter={ticketsListEnter(store.dispatch)}
          onChange={ticketsListChange(store.dispatch)}
        />
        <Route
          path="/tickets/new"
          components={{ main: NewTicketPage }}
        />
        <Route
          path="/tickets/:id/edit"
          components={{ main: EditTicketPage }}
          onEnter={editTicketPageEnter(store.dispatch)}
        />
        <Route
          path="/tickets/:id"
          components={{ main: TicketPage }}
          onEnter={ticketPageEnter(store.dispatch)}
        />

        <Route
          path="/users"
          components={{ main: UsersList }}
          onEnter={usersListEnter(store.dispatch, store)}
          onChange={usersListChange(store.dispatch)}
        />

        <Route path="*" components={{ main: NoMatch }}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
