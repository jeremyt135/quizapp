import { ID, ResultListing } from 'api'

export type DashboardError = { status: number; errors: any[] }

export interface QuizListing {
  _id: ID
  title: string
  date: string
  expiration: string
  questionCount: number
  resultsCount: number
}

export interface DashboardState {
  loading: boolean
  quizzes: QuizListing[] | null
  results: ResultListing[] | null
  error: DashboardError | null
}

export const LOAD_DASHBOARD = 'LOAD_DASHBOARD'
export const LOAD_DASHBOARD_ERROR = 'LOAD_DASHBOARD_ERROR'
export const CLEAR_DASHBOARD = 'CLEAR_DASHBOARD'

interface LoadDashboardAction {
  type: typeof LOAD_DASHBOARD
  payload: { quizzes: any[]; results: any[] }
}

interface LoadDashboardErrorAction {
  type: typeof LOAD_DASHBOARD_ERROR
  payload: DashboardError
}

interface ClearDashboardAction {
  type: typeof CLEAR_DASHBOARD
}

export type DashboardActionTypes =
  | LoadDashboardAction
  | LoadDashboardErrorAction
  | ClearDashboardAction
