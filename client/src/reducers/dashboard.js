import ActionTypes from '../actions/types'

export const dashboard = (
  state = { loading: true, quizzes: null, results: null, error: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.Dashboard.LOAD_DASHBOARD:
      return {
        quizzes: action.data.quizzes,
        results: action.data.results,
        loading: false,
        error: null
      }
    case ActionTypes.Dashboard.CLEAR_DASHBOARD:
      return {
        loading: true,
        quizzes: null,
        results: null,
        error: null
      }
    case ActionTypes.Dashboard.LOAD_DASHBOARD_ERROR:
      return {
        loading: false,
        quizzes: null,
        results: null,
        error: action.data
      }
    default:
      return state
  }
}
