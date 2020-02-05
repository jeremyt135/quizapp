import ActionTypes from '../actions/types'

/**
 * Authentication reducer
 * @param {token: string, isAuthenticated: boolean} state
 */
export const auth = (
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: false
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.Auth.LOGIN_USER:
    case ActionTypes.Auth.REGISTER_USER:
      localStorage.setItem('token', action.data.token)
      return {
        ...state,
        ...action.data,
        isAuthenticated: true
      }
    case ActionTypes.Auth.LOGIN_ERROR:
    case ActionTypes.Auth.REGISTER_ERROR:
    case ActionTypes.Auth.CLEAR_AUTH:
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
