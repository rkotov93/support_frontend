import { connect } from 'react-redux'
import TicketPage from '../components/Tickets/TicketPage'
import { destroyTicket, changeTicketStatus } from '../actions/TicketsActions'

const mapStateToProps = (state, props) => {
  return {
    ...state.tickets.current,
    page: state.tickets.pagination.page,
    filter: props.location.query.filter || 'all',
    isFetching: state.tickets.isFetching,
    role: state.session.role
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDestroy: (id, page, query) => {
      dispatch(destroyTicket(id, page, query))
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
