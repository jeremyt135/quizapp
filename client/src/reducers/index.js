import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { auth } from './user/auth'
import { user } from './user/user'
import { quiz } from './quiz/quiz'
import { quizList } from './quiz/quizlist'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'quizList']
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
  quizList
})

export default persistReducer(rootPersistConfig, rootReducer)
