import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { alertReducer as alerts } from '../store/alerts/reducers'
import { authReducer as auth } from '../store/auth/reducers'
import { user } from './user'
import { quizReducer as quiz } from '../store/quiz/reducers'
import { resultReducer as result } from '../store/result/reducers'
import { quizResultsReducer as quizResults } from '../store/quizresults/reducers'
import { dashboardReducer as dashboard } from '../store/dashboard/reducers'
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
