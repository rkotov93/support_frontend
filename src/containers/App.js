import { connect } from 'react-redux'
import App from '../components/App'
import { logout } from '../actions/SessionActions'

const mapStateToProps = (state, props) => {
  return {
    name: state.session.name,
    role: state.session.role,
    ...props
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
