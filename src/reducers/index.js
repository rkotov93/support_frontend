import { combineReducers } from 'redux'

import { i18nReducer } from 'react-redux-i18n'
import sessions from './sessions'

const rootReducer = combineReducers({
  sessions,
  i18n: i18nReducer
})

export default rootReducer
