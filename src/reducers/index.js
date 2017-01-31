import { combineReducers } from 'redux'

import { i18nReducer } from 'react-redux-i18n'
import { reducer as formReducer } from 'redux-form'
import session from './session'
import registration from './registration'
import tickets from './tickets'

const rootReducer = combineReducers({
  session,
  registration,
  tickets,
  i18n: i18nReducer,
  form: formReducer
})

export default rootReducer
