import { ApiError } from './error'

export type ApiResponse<T = void> = {
  data?: T
  error?: ApiError
}
