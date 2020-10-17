import { Quiz } from 'store/editor/types'
import { parseError } from 'util/parse-error'
import { ApiResponse } from './response'

export const get = async (id: string): Promise<ApiResponse<Quiz>> => {
  const response = await fetch(`/api/quizzes/${id}`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? ''
    }
  })
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }

  const quiz = await response.json()
  return { data: quiz }
}

export const post = async (quiz: Quiz): Promise<ApiResponse> => {
  const response = await fetch('/api/quizzes', {
    method: 'POST',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quiz)
  })
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }
  return {}
}

export const put = async (quiz: Quiz): Promise<ApiResponse> => {
  const response = await fetch(`/api/quizzes/${quiz._id!}/edit`, {
    method: 'PUT',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quiz)
  })
  if (!response.ok) {
    const error = await parseError(response)
    return { error }
  }

  return {}
}
