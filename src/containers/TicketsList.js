import { connect } from 'react-redux'
import TicketsList from '../components/Tickets/TicketsList'

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.items
  }
}

export default connect(
  mapStateToProps,
  null
)(TicketsList)
