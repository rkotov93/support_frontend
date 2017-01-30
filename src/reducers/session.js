import * as constants from '../constants/sessions'

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  email: null,
  name: null,
  role: null,
  errorMessage: null
}

const session = (state = initialState, action) => {
  switch (action.type) {
  case constants.LOGIN:
    return login(state, action)
  case constants.LOGOUT:
    return logout()
  default:
    return state
  }
}

const login = (state, action) => {
  switch (action.status) {
  case 'success':
    return {
      ...initialState,
      isAuthenticated: true,
      email: action.user.email,
      name: action.user.name,
      role: action.user.role
    }
  case 'failure':
    return {
      ...state,
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.errorMessage
    }
  default:
    return {
      ...state,
      isFetching: true,
      isAuthenticated: false
    }
  }
}

const logout = () => {
  return initialState
}

export default session
