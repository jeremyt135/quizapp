import Api, { ApiError, QuizFormat, QuizType } from 'api'
import { useState } from 'react'
import { useMountedEffect } from './usemountedeffect'

export const useQuiz = <T extends QuizFormat>(
  id: string,
  format: T
): [QuizType<T> | undefined, ApiError | undefined, boolean] => {
  const [quiz, setQuiz] = useState<QuizType<T>>()
  const [error, setError] = useState<ApiError>()

  const [loading, setLoading] = useState(true)

  useMountedEffect(
    status => {
      Api.quiz.get(id, format).then(res => {
        if (status.mounted) {
          if (res.data) {
            setQuiz(res.data)
          } else if (res.error) {
            setError(res.error)
          }
          setLoading(false)
        }
      })
    },
    [id]
  )

  return [quiz as QuizType<T>, error, loading]
}
