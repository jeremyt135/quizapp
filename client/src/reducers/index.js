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
  blacklist: ['quiz', 'result', 'dashboard', 'editor']
}

const rootReducer = combineReducers({
  auth,
  user,
  quiz,
  result,
  dashboard,
  editor
})

export default persistReducer(rootPersistConfig, rootReducer)
