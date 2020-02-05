import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { alerts } from './alerts'
import { auth } from './auth'
import { user } from './user'
import { quiz } from './quiz'
import { result } from './result'
import { quizResults } from './quizresults'
import { dashboard } from './dashboard'
import { editor } from './editor'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['alerts', 'quiz', 'result', 'quizResults', 'dashboard']
}

const rootReducer = combineReducers({
  alerts,
  auth,
  user,
  quiz,
  result,
  quizResults,
  dashboard,
  editor
})

export default persistReducer(rootPersistConfig, rootReducer)
