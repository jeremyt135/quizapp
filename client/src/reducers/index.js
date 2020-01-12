import { combineReducers } from 'redux'
import { auth } from './user/auth'
import { user } from './user/user'

export default combineReducers({
  auth,
  user
})
