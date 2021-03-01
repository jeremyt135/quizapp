import Api, {
  ApiError,
  ResultFormat,
  SingleResultType,
  ResultListType
} from 'api'
import { useState } from 'react'
import { useMountedEffect } from './usemountedeffect'

export const useResultList = <T extends ResultFormat>(
  quizId: string,
  format: T
): [ResultListType<T> | undefined, ApiError | undefined, boolean] => {
  const [results, setResults] = useState<ResultListType<T>>()
  const [error, setError] = useState<ApiError>()

  const [loading, setLoading] = useState(true)

  useMountedEffect(
    status => {
      Api.results.getAll(quizId, format).then(res => {
        if (status.mounted) {
          if (res.data) {
            setResults(res.data)
          } else if (res.error) {
            setError(res.error)
          }
          setLoading(false)
        }
      })
    },
    [quizId]
  )

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

  useMountedEffect(
    status => {
      Api.results.getOne(quizId, userId, format).then(res => {
        if (status.mounted) {
          if (res.data) {
            setResult(res.data)
          } else if (res.error) {
            setError(res.error)
          }
          setLoading(false)
        }
      })
    },
    [quizId, userId]
  )

  return [result, error, loading]
}
