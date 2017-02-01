import * as constants from '../constants/tickets'
import headers from './headers'
import { I18n } from 'react-redux-i18n'
import { browserHistory } from 'react-router'

export const ticketsListEnter = (dispatch) => {
  return (nextState) => {
    fetchTickets(nextState.location.query.filter, nextState.location.query.page)(dispatch)
  }
}

export const ticketsListChange = (dispatch) => {
  return (prevState, nextState) => {
    fetchTickets(nextState.location.query.filter, nextState.location.query.page)(dispatch)
  }
}

const fetchTicketsRequest = () => {
  return {
    type: constants.FETCH_TICKETS
  }
}

const fetchTicketsSuccess = (data) => {
  return {
    type: constants.FETCH_TICKETS,
    status: 'success',
    data: data
  }
}

const fetchTicketsFailure = (errorMessages) => {
  return {
    type: constants.FETCH_TICKETS,
    status: 'failure',
    errorMessages
  }
}

export const fetchTickets = (filter, page = 1, query = {}) => {
  const path = filter === constants.ALL || !filter ? '/api/v1/tickets.json' : `/api/v1/tickets/${filter}.json`
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}${path}?page=${page}`, {
      headers: headers()
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        if (json.tickets.length === 0 && page !== 1)
          dispatch(turnPage(1, query))
        else
          dispatch(fetchTicketsSuccess(json))
      }
      else
        dispatch(fetchTicketsFailure(json))
    }).catch(() => dispatch(fetchTicketsFailure([I18n.t('errors.something')])))
  }
}

export const ticketPageEnter = (dispatch) => {
  return (nextState) => {
    fetchTicket(nextState.params.id)(dispatch)
  }
}

export const editTicketPageEnter = (dispatch) => {
  return (nextState) => {
    fetchTicket(nextState.params.id, { edit: true })(dispatch)
  }
}

const fetchTicketRequest = () => {
  return {
    type: constants.FETCH_TICKET
  }
}

const fetchTicketSuccess = (ticket) => {
  return {
    type: constants.FETCH_TICKET,
    status: 'success',
    ticket
  }
}

const fetchTicketFailure = (errorMessages) => {
  return {
    type: constants.FETCH_TICKET,
    status: 'failure',
    errorMessages
  }
}

export const fetchTicket = (id, options = {}) => {
  return (dispatch) => {
    dispatch(fetchTicketRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets/${id}.json`, {
      headers: headers()
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        if (options.edit && json.ticket.status == constants.SOLVED)
          browserHistory.push(`/tickets/${json.ticket.id}`)
        dispatch(fetchTicketSuccess(json.ticket))
      }
      else
        dispatch(fetchTicketFailure(json))
    }).catch(() => dispatch(fetchTicketFailure([I18n.t('errors.something')])))
  }
}

export const destroyTicket = (id, page = 1, query = {}) => {
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets/${id}.json`, {
      method: 'DELETE',
      headers: headers()
    }).then(response => {
      return response
    }).then((response) => {
      if (response.ok) {
        dispatch(turnPage(page, query))
      }
      else
        dispatch(fetchTicketsFailure(I18n.t('errors.something')))
    }).catch((e) => dispatch(fetchTicketsFailure([e.message])))
  }
}

export const createTicket = (ticket) => {
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets.json`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ ticket: ticket })
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        browserHistory.push({ pathname: `/tickets/${json.ticket.id}` })
      }
      else
        dispatch(fetchTicketsFailure(json))
    }).catch((e) => dispatch(fetchTicketsFailure([e.message])))
  }
}

export const updateTicket = (id, data) => {
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets/${id}.json`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ ticket: data })
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        browserHistory.push({ pathname: `/tickets/${json.ticket.id}` })
      }
      else
        dispatch(fetchTicketsFailure(json))
    }).catch((e) => dispatch(fetchTicketsFailure([e.message])))
  }
}

const changeTicketStatusSuccess = (ticket) => {
  return {
    type: constants.CHANGE_TICKET_STATUS,
    ticket
  }
}

export const changeTicketStatus = (id, event) => {
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets/${id}/change_status.json`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ event: event })
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        dispatch(changeTicketStatusSuccess(json.ticket))
      }
      else
        dispatch(fetchTicketsFailure(json))
    }).catch((e) => dispatch(fetchTicketsFailure([e.message])))
  }
}

export const filterTickets = (currentFilter) => {
  const filter = currentFilter === constants.ALL || !currentFilter ? constants.ACTIVE : constants.ALL
  browserHistory.push({ pathname: '/', query: { filter: filter } })
  return fetchTickets(filter, 1)
}

export const turnPage = (page, query) => {
  const newQuery = {
    ...query,
    page: page
  }
  browserHistory.push({ pathname: '/', query: newQuery })
  return fetchTickets(newQuery.filter, page)
}
