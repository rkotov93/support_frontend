import { login, handleEmailInputChange } from '../actions/SessionsActions'
import LoginPage from '../components/Sessions/LoginPage'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    email: state.sessions.email,
    isFetching: state.sessions.isFetching,
    errorMessage: state.sessions.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailChange: (email) => {
      dispatch(handleEmailInputChange(email))
    },
    onFormSubmit: (email, password) => {
      dispatch(login({ email, password }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
