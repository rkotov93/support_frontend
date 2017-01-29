import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import rootReducer from '../reducers'

const configureStore = (preloadedState) => {
  let middlewares
  if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger')
    middlewares = [thunk, promise, createLogger()]
  }
  else
    middlewares = [thunk, promise]

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
