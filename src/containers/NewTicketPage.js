import { connect } from 'react-redux'
import NewTicketPage from '../components/Tickets/NewTicketPage'
import { createTicket } from '../actions/TicketsActions'

const mapStateToProps = (state) => {
  let isFormInvalid = false
  if (state.form.ticket && state.form.ticket.syncErrors)
    isFormInvalid = true

  return {
    isFetching: state.tickets.isFetching,
    isFormInvalid: isFormInvalid,
    errorMessages: state.tickets.errorMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (ticket) => {
      dispatch(createTicket(ticket))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTicketPage)
