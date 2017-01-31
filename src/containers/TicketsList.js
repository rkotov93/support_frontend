import { connect } from 'react-redux'
import TicketsList from '../components/Tickets/TicketsList'
import { destroyTicket, turnPage } from '../actions/TicketsActions'

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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsList)
