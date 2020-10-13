export type ResultError = { status: number; errors: any[] }
export type ResultId = string
export interface ResultAnswer {
  choice: number
  isCorrect: boolean
  correctAnswer: number
}
export interface Result {
  _id: ResultId
  date: string
  user: string
  quiz: string
  quizOwner: string
  answers: ResultAnswer[]
  score: number
  quizTitle: string
  ownerUsername: string
  username: string
}

export interface ResultState {
  loading: boolean
  result: Result | null
  error: ResultError | null
}

// User loads quiz results
export const LOAD_RESULT = 'LOAD_RESULT'
export const LOAD_RESULT_ERROR = 'LOAD_RESULT_ERROR'
export const CLEAR_RESULT = 'CLEAR_RESULT'

interface LoadResultAction {
  type: typeof LOAD_RESULT
  payload: Result
}

interface LoadResultErrorAction {
  type: typeof LOAD_RESULT_ERROR
  payload: ResultError
}

interface ClearResultAction {
  type: typeof CLEAR_RESULT
}

export type ResultActionTypes =
  | LoadResultAction
  | LoadResultErrorAction
  | ClearResultAction
