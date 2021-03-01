import { combineReducers } from 'redux'

import { alertReducer as alerts } from './alerts/reducers'
import { authReducer as auth } from './auth/reducers'
import { userReducer as user } from './user/reducers'

const rootReducer = combineReducers({
  alerts,
  auth,
  user
})

export default rootReducer
