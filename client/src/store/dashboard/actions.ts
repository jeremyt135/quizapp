import {
  CLEAR_DASHBOARD,
  DashboardError,
  LOAD_DASHBOARD,
  LOAD_DASHBOARD_ERROR,
  Quiz,
  Result
} from './types'

export function loadDashboard(quizzes: Quiz[], results: Result[]) {
  return {
    type: LOAD_DASHBOARD,
    payload: {
      quizzes,
      results
    }
  }
}

export function loadDashboardError(error: DashboardError) {
  return {
    type: LOAD_DASHBOARD_ERROR,
    payload: error
  }
}

export function clearDashboard() {
  return {
    type: CLEAR_DASHBOARD
  }
}
