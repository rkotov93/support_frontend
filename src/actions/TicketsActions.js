import * as constants from '../constants/tickets'
import headers from './headers'
import { I18n } from 'react-redux-i18n'
import { browserHistory } from 'react-router'

export const ticketsListEnter = (dispatch) => {
  return (nextState) => {
    fetchTickets(nextState.location.query.page)(dispatch)
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

export const fetchTickets = (page = 1) => {
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets.json?page=${page}`, {
      headers: headers()
    }).then(response => {
      return response.json().then(json => {
        return { json, response }
      })
    }).then(({ json, response }) => {
      if (response.ok) {
        if (json.tickets.length === 0 && page !== 1)
          dispatch(turnPage(1))
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

export const fetchTicket = (id) => {
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
        dispatch(fetchTicketSuccess(json.ticket))
      }
      else
        dispatch(fetchTicketFailure(json))
    }).catch(() => dispatch(fetchTicketFailure([I18n.t('errors.something')])))
  }
}

export const destroyTicket = (id, page = 1) => {
  return (dispatch) => {
    dispatch(fetchTicketsRequest())
    return fetch(`${process.env.API_HOST}/api/v1/tickets/${id}.json`, {
      method: 'DELETE',
      headers: headers()
    }).then(response => {
      return response
    }).then((response) => {
      if (response.ok) {
        dispatch(turnPage(page))
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

export const turnPage = (page) => {
  browserHistory.push({ pathname: '/', query: { page: page } })
  return fetchTickets(page)
}
