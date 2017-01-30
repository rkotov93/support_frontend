import { browserHistory } from 'react-router'
import { AUTH } from '../constants/sessions'
import { loginSuccess } from '../actions/SessionsActions'

export const appInitialize = (dispatch) => {
  return () => {
    const auth = localStorage.getItem(AUTH)
    if (auth)
      dispatch(loginSuccess(JSON.parse(auth)))
    else
      browserHistory.push('/login')
  }
}
