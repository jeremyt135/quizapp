import {
  CLEAR_RESULT,
  LOAD_RESULT,
  LOAD_RESULT_ERROR,
  ResultActionTypes
} from './types'

export function resultReducer(
  state = { result: null, error: null, loading: true },
  action: ResultActionTypes
) {
  switch (action.type) {
    case CLEAR_RESULT:
      return {
        result: null,
        error: null,
        loading: true
      }
    case LOAD_RESULT:
      return {
        result: { ...action.payload },
        error: null,
        loading: false
      }
    case LOAD_RESULT_ERROR:
      return {
        result: null,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}
