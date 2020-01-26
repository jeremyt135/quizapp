import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { auth } from './auth'
import { user } from './user'
import { quiz } from './quiz'
import { result } from './result'
import { dashboard } from './dashboard'
import { editor } from './editor'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'quiz', 'result', 'dashboard', 'editor']
}
const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['token']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user,
  quiz,
  result,
  dashboard,
  editor
})

export default persistReducer(rootPersistConfig, rootReducer)
