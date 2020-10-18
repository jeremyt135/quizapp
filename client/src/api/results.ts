import { parseError } from 'util/parse-error'
import { ApiResponse } from './response'
import { ResultFormat, SingleResultType, ResultListType } from './types'

export const getAll = async <T extends ResultFormat>(
  quizId: string,
  format: T
): Promise<ApiResponse<ResultListType<T>>> => {
  const response = await fetch(`/api/results?quiz=${quizId}&format=${format}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }

  const result = (await response.json()) as { results: ResultListType<T> }
  return { data: result.results as ResultListType<T> }
}

export const getOne = async <T extends ResultFormat>(
  quizId: string,
  userId: string,
  format: T
): Promise<ApiResponse<SingleResultType<T>>> => {
  const response = await fetch(
    `/api/results?quiz=${quizId}&user=${userId}&format=${format}`,
    {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token') ?? ''
      }
    }
  )
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }

  const result = await response.json()
  return { data: result as SingleResultType<T> }
}
