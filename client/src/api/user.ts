import { parseError } from 'util/parse-error'
import { ApiResponse } from './response'
import { QuizListType, ResultFormat, ResultListType } from './types'

export const getQuizzes = async <T extends ResultFormat>(
  format: T
): Promise<ApiResponse<QuizListType<T>>> => {
  const response = await fetch(`/api/users/me/quizzes?format=${format}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }
  const quizzes = await response.json()
  return { data: quizzes as QuizListType<T> }
}

export const getResults = async <T extends ResultFormat>(
  format: T
): Promise<ApiResponse<ResultListType<T>>> => {
  const response = await fetch(`/api/users/me/results?format=${format}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }

  const results = await response.json()
  return { data: results as ResultListType<T> }
}
