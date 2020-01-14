import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'

import rootReducer from '../reducers/index'

export default () => {
  let store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
  )
  let persistor = persistStore(store)
  return { store, persistor }
}
