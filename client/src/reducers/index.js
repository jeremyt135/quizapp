import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { auth } from './user/auth'
import { user } from './user/user'
import { quiz } from './quiz/quiz'
import { result } from './result/result'
import { quizList } from './user/quizlist'
import { resultList } from './user/resultlist'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'quizList', 'resultList', 'quiz', 'result']
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
  quizList,
  resultList
})

export default persistReducer(rootPersistConfig, rootReducer)
