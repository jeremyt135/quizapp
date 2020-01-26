import ActionTypes from '../actions/types'

export const user = (
  state = { loading: true, user: null, error: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.User.LOAD_USER:
      return {
        user: { ...action.data },
        loading: false,
        error: null
      }
    case ActionTypes.User.DELETE_USER:
    case ActionTypes.User.LOAD_USER_ERROR:
      return { loading: true, user: null, error: action.data }
    case ActionTypes.User.LOGOUT:
      return { loading: true, data: null, error: null }
    default:
      return state
  }
}
