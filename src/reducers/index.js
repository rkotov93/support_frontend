import { combineReducers } from 'redux'

import { i18nReducer } from 'react-redux-i18n'
import { reducer as formReducer } from 'redux-form'
import session from './session'
import registration from './registration'
import tickets from './tickets'
import users from './users'
import pdfReport from './pdfReport'

const rootReducer = combineReducers({
  session,
  registration,
  tickets,
  users,
  pdfReport,
  i18n: i18nReducer,
  form: formReducer
})

export default rootReducer
