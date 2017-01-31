import { connect } from 'react-redux'
import TicketsList from '../components/Tickets/TicketsList'
import { destroyTicket } from '../actions/TicketsActions'

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDestroy: (id) => {
      dispatch(destroyTicket(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsList)
