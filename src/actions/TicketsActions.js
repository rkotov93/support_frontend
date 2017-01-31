import * as constants from '../constants/tickets'
import headers from './headers'
import { I18n } from 'react-redux-i18n'

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
        dispatch(fetchTicketsSuccess(json))
      }
      else
        dispatch(fetchTicketsFailure(json))
    }).catch(() => dispatch(fetchTicketsFailure([I18n.t('errors.something')])))
  }
}
