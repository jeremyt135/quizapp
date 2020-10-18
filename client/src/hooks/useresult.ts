import Api, {
  ApiError,
  ResultFormat,
  SingleResultType,
  ResultListType
} from 'api'
import { useEffect, useState } from 'react'

export const useResultList = <T extends ResultFormat>(
  quizId: string,
  format: T
): [ResultListType<T> | undefined, ApiError | undefined, boolean] => {
  const [results, setResults] = useState<ResultListType<T>>()
  const [error, setError] = useState<ApiError>()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.results.getAll(quizId, format).then(res => {
      if (res.data) {
        setResults(res.data)
      } else if (res.error) {
        setError(res.error)
      }
      setLoading(false)
    })
  }, [quizId])

  return [results, error, loading]
}

export const useSingleResult = <T extends ResultFormat>(
  quizId: string,
  userId: string,
  format: T
): [SingleResultType<T> | undefined, ApiError | undefined, boolean] => {
  const [result, setResult] = useState<SingleResultType<T>>()
  const [error, setError] = useState<ApiError>()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.results.getOne(quizId, userId, format).then(res => {
      if (res.data) {
        setResult(res.data)
      } else if (res.error) {
        setError(res.error)
      }
      setLoading(false)
    })
  }, [quizId, userId])

  return [result, error, loading]
}
