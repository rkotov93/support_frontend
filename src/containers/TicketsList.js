import { connect } from 'react-redux'
import TicketsList from '../components/Tickets/TicketsList'
import { destroyTicket, turnPage, changeTicketStatus } from '../actions/TicketsActions'

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.items,
    pagination: state.tickets.pagination,
    errorMessages: state.tickets.errorMessages,
    role: state.session.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDestroy: (id, page) => {
      dispatch(destroyTicket(id, page))
    },
    turnPage: (page) => {
      dispatch(turnPage(page))
    },
    start: (id) => {
      dispatch(changeTicketStatus(id, 'start'))
    },
    resolve: (id) => {
      dispatch(changeTicketStatus(id, 'resolve'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsList)
