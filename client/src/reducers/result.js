import ActionTypes from '../actions/types'

/**
 * Result reducer
 * @param {error: { status: number, errors: [object]}, result: object, loading: boolean} state
 */
export const result = (
  state = { result: null, error: null, loading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.Result.CLEAR_RESULT:
      return {
        result: null,
        error: null,
        loading: true
      }
    case ActionTypes.Result.LOAD_RESULT:
      return {
        result: { ...action.data },
        error: null,
        loading: false
      }
    case ActionTypes.Result.LOAD_RESULT_ERROR:
      return {
        result: null,
        error: action.data,
        loading: false
      }

    default:
      return state
  }
}
