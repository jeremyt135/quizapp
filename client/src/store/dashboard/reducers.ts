import {
  CLEAR_DASHBOARD,
  DashboardActionTypes,
  DashboardState,
  LOAD_DASHBOARD,
  LOAD_DASHBOARD_ERROR
} from './types'

export function dashboardReducer(
  state: DashboardState = {
    loading: true,
    quizzes: null,
    results: null,
    error: null
  },
  action: DashboardActionTypes
): DashboardState {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return {
        quizzes: action.payload.quizzes,
        results: action.payload.results,
        loading: false,
        error: null
      }
    case CLEAR_DASHBOARD:
      return {
        loading: true,
        quizzes: null,
        results: null,
        error: null
      }
    case LOAD_DASHBOARD_ERROR:
      return {
        loading: false,
        quizzes: null,
        results: null,
        error: action.payload
      }
    default:
      return state
  }
}
