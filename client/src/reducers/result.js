import ActionTypes from '../actions/types'

export const result = (
  state = { result: null, errors: null, loading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.Result.LOAD_RESULT_ERROR:
    case ActionTypes.Result.CLEAR_RESULT:
      return {
        result: null,
        errors: [],
        loading: true
      }
    case ActionTypes.Result.LOAD_RESULT:
      return {
        result: { ...action.data },
        errors: null,
        loading: false
      }
    default:
      return state
  }
}
