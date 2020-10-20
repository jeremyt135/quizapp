import { createStore, applyMiddleware, Action } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootReducer from './reducer'

export default () => {
  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['alerts', 'dashboard']
  }

  let store = createStore(
    persistReducer(rootPersistConfig, rootReducer),
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
