import Api, { ApiError, QuizFormat, QuizType } from 'api'
import { useEffect, useState } from 'react'

export const useQuiz = <T extends QuizFormat>(
  id: string,
  format: T
): [QuizType<T> | undefined, ApiError | undefined, boolean] => {
  const [quiz, setQuiz] = useState<QuizType<T>>()
  const [error, setError] = useState<ApiError>()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.quiz.get(id, format).then(res => {
      if (res.data) {
        setQuiz(res.data)
      } else if (res.error) {
        setError(res.error)
      }
      setLoading(false)
    })
  }, [id])

  return [quiz as QuizType<T>, error, loading]
}
