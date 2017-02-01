import { browserHistory } from 'react-router'
import { AUTH } from '../constants/sessions'
import * as constants from '../constants/sessions'
import { loginSuccess } from '../actions/SessionActions'
import headers from './headers'

export const appInitialize = (dispatch) => {
  return () => {
    const auth = localStorage.getItem(AUTH)
    if (auth)
      fetch(`${process.env.API_HOST}/api/v1/users/me.json`, {
        headers: headers()
      }).then(response => {
        return response.json().then(json => {
          return { json, response }
        })
      }).then(({ json, response }) => {
        if (response.ok) {
          localStorage.setItem(constants.AUTH, JSON.stringify(json.user))
          dispatch(loginSuccess(json.user))
        }
        else
          browserHistory.push('/login')
      }).catch(() => browserHistory.push('/login'))
    else
      browserHistory.push('/login')
  }
}
