export type ResultListingError = { status: number; errors: any[] }

export interface ResultListing {
  _id: string
  date: string
  user: string
  quiz: string
  quizOwner: string
  score: number
  username: string
}

/**
 * Quiz results reducer
 * @param {error: { status: number, errors: [{object}]}, loading: boolean, results: [object]} state
 */
export interface ResultListingsState {
  loading: boolean
  results: ResultListing[] | null
  error: ResultListingError | null
}

// Actions for user viewing result listings for a quiz they created
export const LOAD_RESULT_LIST = 'LOAD_RESULT_LIST'
export const LOAD_RESULT_LIST_ERROR = 'LOAD_RESULT_LIST_ERROR'
export const CLEAR_RESULT_LIST = 'CLEAR_RESULT_LIST'

interface LoadResultListAction {
  type: typeof LOAD_RESULT_LIST
  payload: ResultListing[]
}

interface LoadResultListErrorAction {
  type: typeof LOAD_RESULT_LIST_ERROR
  payload: ResultListingError
}

interface ClearResultListAction {
  type: typeof CLEAR_RESULT_LIST
}

export type ResultListActionTypes =
  | LoadResultListAction
  | LoadResultListErrorAction
  | ClearResultListAction
