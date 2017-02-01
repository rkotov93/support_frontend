import * as actions from '../constants/tickets'

const initialState = {
  items: [],
  isFetching: false,
  errorMessages: null,
  current: null,
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
  case actions.FETCH_TICKET:
    return fetchTicket(state, action)
  case actions.CHANGE_TICKET_STATUS:
    return changeTicketStatus(state, action)
  default:
    return state
  }
}

const fetchTickets = (state, action) => {
  switch (action.status) {
  case 'success':
    return {
      ...state,
      items: action.data.tickets,
      pagination: {
        page: action.data.meta.current_page,
        totalPages: action.data.meta.total_pages,
        totalCount: action.data.meta.total_count
      },
      isFetching: false,
      errorMessages: null
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

const fetchTicket = (state, action) => {
  switch (action.status) {
  case 'success':
    return {
      ...state,
      current: action.ticket,
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

const changeTicketStatus = (state, action) => {
  const items = state.items.map(ticket => {
    if (ticket.id === action.ticket.id)
      return action.ticket
    else
      return ticket
  })

  let current = null
  if (state.current)
    current = action.ticket

  return {
    ...state,
    isFetching: false,
    items,
    current
  }
}

export default tickets
