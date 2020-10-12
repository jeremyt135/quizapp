import { createStore, applyMiddleware, Action } from 'redux'
import { persistStore } from 'redux-persist'

import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

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

export type RootState = ReturnType<typeof rootReducer>
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
