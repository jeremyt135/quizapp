import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { alertReducer as alerts } from './alerts/reducers'
import { authReducer as auth } from './auth/reducers'
import { userReducer as user } from './user/reducers'
import { quizReducer as quiz } from './quiz/reducers'
import { resultReducer as result } from './result/reducers'
import { quizResultsReducer as quizResults } from './quizresults/reducers'
import { dashboardReducer as dashboard } from './dashboard/reducers'
import { editorReducer as editor } from './editor/reducers'

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
