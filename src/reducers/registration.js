import * as constants from '../constants/registrations'

const initialState = {
  isFetching: false,
  errorMessage: null
}

const registration = (state = initialState, action) => {
  switch (action.type) {
  case constants.REGISTER:
    return register(state, action)
  default:
    return state
  }
}

const register = (state, action) => {
  switch (action.status) {
  case 'success':
    return initialState
  case 'failure':
    return {
      ...initialState,
      errorMessages: action.errorMessages
    }
  default:
    return {
      ...state,
      isFetching: true
    }
  }
}

export default registration
