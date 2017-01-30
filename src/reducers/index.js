import { combineReducers } from 'redux'

import { i18nReducer } from 'react-redux-i18n'
import session from './session'

const rootReducer = combineReducers({
  session,
  i18n: i18nReducer
})

export default rootReducer
