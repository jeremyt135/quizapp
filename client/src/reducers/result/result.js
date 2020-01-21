import ActionTypes from '../../actions/types'

export const result = (
  state = { data: null, errors: null, loading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.Result.LOAD_RESULT_ERROR:
    case ActionTypes.Result.CLEAR_RESULT:
      return {
        data: null,
        errors: [],
        loading: true
      }
    case ActionTypes.Result.LOAD_RESULT:
      return {
        data: { ...action.data },
        errors: null,
        loading: false
      }
    default:
      return state
  }
}
