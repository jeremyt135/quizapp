import { combineReducers } from 'redux'

import { alertReducer as alerts } from './alerts/reducers'
import { authReducer as auth } from './auth/reducers'
import { userReducer as user } from './user/reducers'
import { dashboardReducer as dashboard } from './dashboard/reducers'

const rootReducer = combineReducers({
  alerts,
  auth,
  user,
  dashboard
})

export default rootReducer
