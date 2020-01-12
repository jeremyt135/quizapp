import ActionTypes from '../../actions/types'

export const user = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.User.LOAD_USER:
      return {
        ...action.data
      }
    case ActionTypes.User.LOAD_USER_ERROR:
      return null
    default:
      return state
  }
}
