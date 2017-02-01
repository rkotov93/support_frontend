import * as constants from '../constants/users'
import * as roles from '../constants/roles'
import headers from './headers'
import { browserHistory } from 'react-router'
import { I18n } from 'react-redux-i18n'

export const usersListEnter = (dispatch, store) => {
  return (nextState) => {
    if (store.getState().session.role === roles.ADMIN)
      fetchUsers(nextState.location.query.page)(dispatch)
    else
    browserHistory.push('/')
  }
}

export const usersListChange = (dispatch) => {
  return (prevState, nextState) => {
    fetchUsers(nextState.location.query.page)(dispatch)
  }
}

const fetchUsersRequest = () => {
  return {
    type: constants.FETCH_USERS
  }
}

const fetchUsersSuccess = (data) => {
  return {
    type: constants.FETCH_USERS,
    status: 'success',
    data: data
  }
}

const fetchUsersFailure = (errorMessages) => {
  return {
    type: constants.FETCH_USERS,
    status: 'failure',
    errorMessages
  }
}

export const fetchUsers = (page = 1) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    return fetch(`${process.env.API_HOST}/api/v1/users.json?page=${page}`, {
      headers: headers()
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        if (json.users.length === 0 && page !== 1)
          dispatch(turnPage(1))
        else
          dispatch(fetchUsersSuccess(json))
      }
      else
        dispatch(fetchUsersFailure(json))
    }).catch(() => dispatch(fetchUsersFailure([I18n.t('errors.something')])))
  }
}

export const destroyUser = (id, page = 1) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    return fetch(`${process.env.API_HOST}/api/v1/users/${id}.json`, {
      method: 'DELETE',
      headers: headers()
    }).then(response => {
      return response
    }).then((response) => {
      if (response.ok) {
        dispatch(turnPage(page))
      }
      else
        dispatch(fetchUsersFailure(I18n.t('errors.something')))
    }).catch((e) => dispatch(fetchUsersFailure([e.message])))
  }
}

const changeUserRoleSuccess = (user) => {
  return {
    type: constants.CHANGE_USER_ROLE,
    status: 'success',
    user
  }
}

export const changeUserRole = (id, role) => {
  return (dispatch) => {
    return fetch(`${process.env.API_HOST}/api/v1/users/${id}/change_role.json`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ role: role })
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok)
        dispatch(changeUserRoleSuccess(json.user))
      else
        dispatch(fetchUsersFailure(json))
    }).catch(() => dispatch(fetchUsersFailure([I18n.t('errors.something')])))
  }
}

export const turnPage = (page) => {
  browserHistory.push({ pathname: '/users', query: { page: page } })
  return fetchUsers(page)
}
