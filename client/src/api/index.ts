import * as quiz from './quiz'
import * as results from './results'
import * as user from './user'
export type { ApiError } from './error'
export type { ApiResponse } from './response'
export * from './types'

export default {
  quiz,
  results,
  user
}
