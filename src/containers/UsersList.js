import { connect } from 'react-redux'
import UsersList from '../components/Users/UsersList'
import { turnPage, destroyUser, changeUserRole } from '../actions/UsersActions'

const mapStateToProps = (state) => {
  return {
    users: state.users.items,
    pagination: state.users.pagination,
    errorMessages: state.users.errorMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDestroy: (id, page) => {
      dispatch(destroyUser(id, page))
    },
    turnPage: (page) => {
      dispatch(turnPage(page))
    },
    changeRole: (id, role) => {
      dispatch(changeUserRole(id, role))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList)
