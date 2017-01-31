import { register } from '../actions/RegistrationActions'
import RegistrationForm from '../components/Registrations/RegistrationForm'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  let password = null
  if (state.form.registration && state.form.registration.values)
    password = state.form.registration.values.password

  let isFormInvalid = false
  if (state.form.registration && state.form.registration.syncErrors)
    isFormInvalid = true

  return {
    isFetching: state.registration.isFetching,
    errorMessages: state.registration.errorMessages,
    isFormInvalid: isFormInvalid,
    password: password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (user) => {
      console.log(user)
      dispatch(register(user))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm)
