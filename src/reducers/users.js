import * as constants from '../constants/users'

const initialState = {
  items: [],
  isFetching: false,
  errorMessages: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalCount: null
  }
}

const users = (state = initialState, action) => {
  switch (action.type) {
  case constants.FETCH_USERS:
    return fetchUsers(state, action)
  case constants.CHANGE_USER_ROLE:
    return changeUserRole(state, action)
  default:
    return state
  }
}

const fetchUsers = (state, action) => {
  switch (action.status) {
  case 'success':
    return {
      ...initialState,
      items: action.data.users,
      pagination: {
        page: action.data.meta.current_page,
        totalPages: action.data.meta.total_pages,
        totalCount: action.data.meta.total_count
      }
    }
  case 'failure':
    return {
      ...initialState,
      errorMessages: action.errorMessages
    }
  default:
    return {
      ...initialState,
      isFetching: true
    }
  }
}

const changeUserRole = (state, action) => {
  const items = state.items.map(user => {
    if (user.id === action.user.id)
      return action.user
    else
      return user
  })
  return {
    ...state,
    items
  }
}

export default users
