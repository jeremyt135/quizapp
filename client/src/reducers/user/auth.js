import ActionTypes from '../../actions/types'

export const auth = (
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.Auth.AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.data
      }
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
    case ActionTypes.Auth.AUTH_ERROR:
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
