import {
  AuthActionTypes,
  AuthState,
  AUTH_ERROR,
  AUTH_USER,
  CLEAR_AUTH
} from './types'

export function authReducer(
  state: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false
  },
  action: AuthActionTypes
) {
  switch (action.type) {
    case AUTH_USER:
      localStorage.setItem('token', action.payload!)
      return {
        ...state,
        token: action.payload!,
        isAuthenticated: true
      }
    case AUTH_ERROR:
    case CLEAR_AUTH:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false
      }
    default:
      return state
  }
}
