import {
  CLEAR_DASHBOARD,
  DashboardActionTypes,
  DashboardError,
  LOAD_DASHBOARD,
  LOAD_DASHBOARD_ERROR,
  Quiz,
  Result
} from './types'

export function loadDashboard(
  quizzes: Quiz[],
  results: Result[]
): DashboardActionTypes {
  return {
    type: LOAD_DASHBOARD,
    payload: {
      quizzes,
      results
    }
  }
}

export function loadDashboardError(
  error: DashboardError
): DashboardActionTypes {
  return {
    type: LOAD_DASHBOARD_ERROR,
    payload: error
  }
}

export function clearDashboard(): DashboardActionTypes {
  return {
    type: CLEAR_DASHBOARD
  }
}
