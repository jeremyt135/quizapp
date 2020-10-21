import Api, { ApiError, ResultListType, QuizListType } from 'api'
import { useState } from 'react'
import { User } from 'store/user/types'
import { useMountedEffect } from './usemountedeffect'

type LoadingData<T> = {
  loading: boolean
  data?: T
  error?: ApiError
}

type DashboardData = {
  quizzes: LoadingData<QuizListType<'listing'>>
  results: LoadingData<ResultListType<'listing'>>
}

export const useDashboard = (user: User | null | undefined): DashboardData => {
  const [data, setData] = useState<DashboardData>({
    quizzes: {
      loading: true
    },
    results: {
      loading: true
    }
  })

  const userQuizList = user?.quizzes
  const userResultList = user?.results

  useMountedEffect(
    status => {
      Api.user.getQuizzes('listing').then(res => {
        if (status.mounted) {
          setData(prev => {
            return {
              results: prev.results,
              quizzes: {
                loading: false,
                ...res
              }
            }
          })
        }
      })
    },
    [userQuizList]
  )

  useMountedEffect(
    status => {
      Api.user.getResults('listing').then(res => {
        if (status.mounted) {
          setData(prev => {
            return {
              quizzes: prev.quizzes,
              results: {
                loading: false,
                ...res
              }
            }
          })
        }
      })
    },
    [userResultList]
  )

  return data
}
