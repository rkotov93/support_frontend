import { connect } from 'react-redux'
import TicketsList from '../components/Tickets/TicketsList'
import { destroyTicket, turnPage, changeTicketStatus, filterTickets } from '../actions/TicketsActions'

const mapStateToProps = (state, props) => {
  return {
    tickets: state.tickets.items,
    pagination: state.tickets.pagination,
    errorMessages: state.tickets.errorMessages,
    role: state.session.role,
    filter: props.location.query.filter || 'all'
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDestroy: (id, page, query) => {
      dispatch(destroyTicket(id, page, query))
    },
    turnPage: (page) => {
      dispatch(turnPage(page, props.location.query))
    },
    start: (id) => {
      dispatch(changeTicketStatus(id, 'start'))
    },
    resolve: (id) => {
      dispatch(changeTicketStatus(id, 'resolve'))
    },
    changeFilter: (filter) => {
      dispatch(filterTickets(filter))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsList)
