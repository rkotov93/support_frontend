import { connect } from 'react-redux'
import App from '../components/App'
import { logout } from '../actions/SessionActions'
import { generate } from '../actions/PdfReportActions'

const mapStateToProps = (state, props) => {
  return {
    name: state.session.name,
    role: state.session.role,
    report: state.pdfReport.url,
    ...props
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    },
    generateReport: () => {
      dispatch(generate())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
