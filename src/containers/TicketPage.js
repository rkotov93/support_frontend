import { connect } from 'react-redux'
import TicketPage from '../components/Tickets/TicketPage'
import { destroyTicket } from '../actions/TicketsActions'

const mapStateToProps = (state) => {
  return {
    ...state.tickets.current,
    page: state.tickets.pagination.page,
    isFetching: state.tickets.isFetching,
    role: state.session.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDestroy: (id, page) => {
      dispatch(destroyTicket(id, page))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketPage)
