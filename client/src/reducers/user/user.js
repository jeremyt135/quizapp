import ActionTypes from '../../actions/types'

export const user = (state = { loading: true, data: null }, action) => {
  switch (action.type) {
    case ActionTypes.User.LOAD_USER:
      return {
        data: { ...action.data },
        loading: false
      }
    case ActionTypes.User.DELETE_USER:
    case ActionTypes.User.LOAD_USER_ERROR:
    case ActionTypes.User.LOGOUT:
      return { loading: true, data: null }
    default:
      return state
  }
}
