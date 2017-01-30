import { browserHistory } from 'react-router'
import * as constants from '../constants/sessions'

export const loginPageEnter = () => {
  return (nextState, replace) => {
    if (localStorage.getItem(constants.AUTH))
      replace('/')
  }
}

const loginRequest = () => {
  return {
    type: constants.LOGIN
  }
}

export const loginSuccess = (user) => {
  return {
    type: constants.LOGIN,
    status: 'success',
    user
  }
}

const loginFailure = (errorMessage) => {
  return {
    type: constants.LOGIN,
    status: 'failure',
    errorMessage
  }
}

export const login = (creds) => {
  return (dispatch) => {
    dispatch(loginRequest())
    fetch(`${process.env.API_HOST}/api/v1/user_token.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ auth: creds })
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        localStorage.setItem(constants.AUTH, JSON.stringify(json.user))
        dispatch(loginSuccess(json.user))
        browserHistory.push('/')
      }
      else
        dispatch(loginFailure('Not authorized'))
    }).catch(() => dispatch(loginFailure('Not authorized')))
  }
}

export const logout = () => {
  localStorage.removeItem('jwt')
  return {
    type: constants.LOGOUT
  }
}

export const handleEmailInputChange = (value) => {
  return {
    type: 'LOGIN_FORM_EMAIL_CHANGE',
    value
  }
}
