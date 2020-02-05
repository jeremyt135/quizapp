import { QuizResults } from '../actions/types'

/**
 * Quiz results reducer
 * @param {error: { status: number, errors: [{object}]}, loading: boolean, results: [object]} state
 */
export const quizResults = (
  state = { results: null, error: null, loading: true },
  action
) => {
  switch (action.type) {
    case QuizResults.LOAD_RESULT_LIST:
      return {
        results: action.data,
        error: null,
        loading: false
      }
    case QuizResults.LOAD_RESULT_LIST_ERROR:
      return {
        error: action.data,
        results: null,
        loading: false
      }
    case QuizResults.CLEAR_RESULT_LIST:
      return {
        results: null,
        error: null,
        loading: true
      }

    default:
      return state
  }
}
