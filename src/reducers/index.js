import { combineReducers } from 'redux'

import { i18nReducer } from 'react-redux-i18n'
import { reducer as formReducer } from 'redux-form'
import session from './session'
import registration from './registration'

const rootReducer = combineReducers({
  session,
  registration,
  i18n: i18nReducer,
  form: formReducer
})

export default rootReducer
