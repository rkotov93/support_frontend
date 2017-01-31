import { connect } from 'react-redux'
import EditTicketPage from '../components/Tickets/EditTicketPage'
import { updateTicket } from '../actions/TicketsActions'

const mapStateToProps = (state) => {
  let isFormInvalid = false
  if (state.form.ticket && state.form.ticket.syncErrors)
    isFormInvalid = true

  return {
    initialValues: state.tickets.current,
    isFetching: state.tickets.isFetching,
    isFormInvalid: isFormInvalid
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (data) => {
      dispatch(updateTicket(props.params.id, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTicketPage)
