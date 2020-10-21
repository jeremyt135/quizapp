import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'
import { createMemoryHistory } from 'history'

import { user, auth } from 'mocks/state'

jest.mock('components/quiz/answerform/QuizAnswerForm', () => jest.fn())
import QuizAnswerForm from 'components/quiz/answerform/QuizAnswerForm'

jest.mock('components/quiz/result/QuizResultList', () => jest.fn())
import QuizResultList from 'components/quiz/result/QuizResultList'

jest.mock('util/jwt')
import { tokenIsExpired } from 'util/jwt'

import QuizRoute from './QuizRoute'
import { Switch } from 'react-router-dom'
import { mocked } from 'ts-jest/utils'
import { UserState } from 'store/user/types'
import { AuthState } from 'store/auth/types'
import clone from 'clone'

const withSwitch = (el: React.ReactElement) => <Switch>{el}</Switch>

describe('QuizRoute', () => {
  let mockUser: UserState
  let mockAuth: AuthState

  const mockTokenIsExpired = mocked(tokenIsExpired).mockReturnValue(false)
  const MockQuizAnswerForm = mocked(QuizAnswerForm).mockReturnValue(
    <div>QuizAnswerForm</div>
  )
  const MockQuizResultList = mocked(QuizResultList).mockReturnValue(
    <div>QuizResultList</div>
  )

  beforeEach(() => {
    mockTokenIsExpired.mockClear()
    MockQuizAnswerForm.mockClear()
    MockQuizResultList.mockClear()
    mockUser = clone(user)
    mockAuth = clone(auth)
  })

  it('redirects to /login if current user is unauthenticated', () => {
    const mockStore = {
      user,
      auth
    }
    const quizId = mockStore.user.user!.quizzes[0]
    const history = createMemoryHistory()
    history.push(`/quizzes/${quizId}`)
    render(<QuizRoute exact path="/quizzes/:id" />, mockStore, history)
    expect(history.location.pathname).toEqual('/login')
  })

  it('renders spinner if authenticated but user is loading', () => {
    const mockStore = {
      auth: {
        ...auth,
        isAuthenticated: true
      },
      user: {
        ...user,
        loading: true
      }
    }
    const quizId = mockStore.user.user!.quizzes[0]
    const history = createMemoryHistory()
    history.push(`/quizzes/${quizId}`)
    render(<QuizRoute exact path="/quizzes/:id" />, mockStore, history)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a QuizResultList if the current user owns the quiz', () => {
    const mockStore = {
      user,
      auth: {
        ...auth,
        isAuthenticated: true
      }
    }
    const quizId = mockStore.user.user!.quizzes[0]
    const history = createMemoryHistory()
    history.push(`/quizzes/${quizId}`)
    render(<QuizRoute exact path="/quizzes/:id" />, mockStore, history)
    expect(screen.queryByText('QuizResultList')).not.toBeNull()
  })

  it('renders a QuizAnswerForm when the current user does not own the quiz', () => {
    const mockStore = {
      user,
      auth: {
        ...auth,
        isAuthenticated: true
      }
    }
    const quizId = mockStore.user.user!.quizzes[0]
    mockStore.user.user!.quizzes = []

    const history = createMemoryHistory()

    render(
      withSwitch(<QuizRoute exact path="/quizzes/:id" />),
      mockStore,
      history
    )
    history.push(`/quizzes/${quizId}`)
    expect(screen.queryByText('QuizAnswerForm')).not.toBeNull()
  })
})
