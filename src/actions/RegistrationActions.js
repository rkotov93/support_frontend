import { browserHistory } from 'react-router'
import * as constants from '../constants/registrations'
import { AUTH } from '../constants/sessions'
import { loginSuccess } from './SessionActions'

const registrationRequest = () => {
  return {
    type: constants.REGISTER
  }
}

const registrationSuccess = () => {
  console.log(localStorage.getItem(constants.AUTH))
  return {
    type: constants.REGISTER,
    status: 'success'
  }
}

const registrationFailure = (errorMessages) => {
  return {
    type: constants.REGISTER,
    status: 'failure',
    errorMessages
  }
}

export const register = (user) => {
  return (dispatch) => {
    dispatch(registrationRequest())
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
        localStorage.setItem(AUTH, JSON.stringify(json.user))
        dispatch(registrationSuccess())
        dispatch(loginSuccess(json.user))
        browserHistory.push('/')
      }
      else
        dispatch(registrationFailure(json))
    }).catch((e) => dispatch(registrationFailure([e.message])))
  }
}
