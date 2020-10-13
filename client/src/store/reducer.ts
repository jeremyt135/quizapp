import { combineReducers } from 'redux'

import { alertReducer as alerts } from './alerts/reducers'
import { authReducer as auth } from './auth/reducers'
import { userReducer as user } from './user/reducers'
import { quizReducer as quiz } from './quiz/reducers'
import { resultReducer as result } from './result/reducers'
import { quizResultsReducer as quizResults } from './quizresults/reducers'
import { dashboardReducer as dashboard } from './dashboard/reducers'
import { editorReducer as editor } from './editor/reducers'

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

export default rootReducer
