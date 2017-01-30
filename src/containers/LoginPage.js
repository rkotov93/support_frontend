import { login, handleEmailInputChange } from '../actions/SessionActions'
import LoginPage from '../components/Sessions/LoginPage'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    email: state.session.email,
    isFetching: state.session.isFetching,
    errorMessage: state.session.errorMessage
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
