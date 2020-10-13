import {
  LOAD_RESULT_LIST,
  LOAD_RESULT_LIST_ERROR,
  ResultListActionTypes,
  ResultListingsState
} from './types'

export const quizResultsReducer = (
  state: ResultListingsState = { results: null, error: null, loading: true },
  action: ResultListActionTypes
) => {
  switch (action.type) {
    case LOAD_RESULT_LIST:
      return {
        results: action.payload,
        error: null,
        loading: false
      }
    case LOAD_RESULT_LIST_ERROR:
      return {
        error: action.payload,
        results: null,
        loading: false
      }
    case LOAD_RESULT_LIST:
      return {
        results: null,
        error: null,
        loading: true
      }

    default:
      return state
  }
}
