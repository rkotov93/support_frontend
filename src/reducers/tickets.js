import * as actions from '../constants/tickets'

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

const tickets = (state = initialState, action) => {
  switch (action.type) {
  case actions.FETCH_TICKETS:
    return fetchTickets(state, action)
  default:
    return state
  }
}

const fetchTickets = (state, action) => {
  switch (action.status) {
  case 'success':
    return {
      items: action.data.tickets,
      pagination: {
        page: action.data.meta.current_page,
        totalPages: action.data.meta.total_pages,
        totalCount: action.data.meta.total_count
      },
      isFetching: false
    }
  case 'failure':
    return {
      ...initialState,
      isFetching: false,
      errorMessages: action.errorMessages
    }
  default:
    return {
      ...state,
      isFetching: true
    }
  }
}

export default tickets
