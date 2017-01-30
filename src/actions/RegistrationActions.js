import { browserHistory } from 'react-router'
import * as constants from '../constants/REGISTRATIONS'
import { loginSuccess } from './SessionActions'

const registrationRequest = () => {
  return {
    type: constants.REGISTER
  }
}

const registrationSuccess = () => {
  return {
    type: constants.REGISTER,
    status: 'success'
  }
}

const registrationFailure = (errorMessage) => {
  return {
    type: constants.REGISTER,
    status: 'failure',
    errorMessage
  }
}

export const register = (user) => {
  return (dispatch) => {
    dispatch(registerRequest())
    fetch(`${process.env.API_HOST}/api/v1/registration.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user })
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        localStorage.setItem(constants.AUTH, JSON.stringify(json.user))
        dispatch(registrationSuccess())
        dispatch(loginSuccess(json.user))
        browserHistory.push('/')
      }
      else
        dispatch(loginFailure('Not authorized'))
    }).catch(() => dispatch(loginFailure('Not authorized')))
  }
}
