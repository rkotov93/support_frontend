import { connect } from 'react-redux'
import TicketPage from '../components/Tickets/TicketPage'
import { destroyTicket, changeTicketStatus } from '../actions/TicketsActions'

const mapStateToProps = (state) => {
  return {
    ...state.tickets.current,
    page: state.tickets.pagination.page,
    isFetching: state.tickets.isFetching,
    role: state.session.role
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDestroy: (id, page) => {
      dispatch(destroyTicket(id, page))
    },
    start: () => {
      dispatch(changeTicketStatus(props.params.id, 'start'))
    },
    resolve: () => {
      dispatch(changeTicketStatus(props.params.id, 'resolve'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketPage)
