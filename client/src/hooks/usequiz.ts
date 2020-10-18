import Api, { ApiError } from 'api'
import { Quiz } from 'api'
import moment from 'moment'
import { useEffect, useState } from 'react'

export const useQuiz = (id?: string, defaultValue?: Quiz) => {
  const [quiz, setQuiz] = useState<Quiz>(
    defaultValue ?? {
      title: '',
      isPublic: true,
      allowedUsers: [],
      expiration: moment().add(1, 'd').toISOString(),
      questions: []
    }
  )
  const [error, setError] = useState<ApiError>()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      Api.quiz.get(id).then(res => {
        if (res.data) {
          setQuiz(res.data)
        } else if (res.error) {
          setError(res.error)
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [id])

  return { quiz, error, loading }
}
