import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'

jest.mock('store/quiz/thunks')
import { getQuiz, clearQuiz } from 'store/quiz/thunks'
const clearQuizActual = jest.requireActual('store/quiz/thunks').clearQuiz

import * as stateMocks from 'mocks/state'

import QuizRoute from './QuizRoute'
import { Switch } from 'react-router-dom'

const withSwitch = (el: React.ReactElement) => <Switch>{el}</Switch>

describe('QuizRoute', () => {
  const getQuizMock = mocked(getQuiz).mockReturnValue(dispatch => {})
  const clearQuizMock = mocked(clearQuiz).mockImplementation(clearQuizActual)

  beforeEach(() => {
    getQuizMock.mockClear()
    clearQuizMock.mockClear()
  })

  it('calls clearQuiz when navigating away', () => {
    const mockStore = {
      user: stateMocks.user,
      quiz: {
        ...stateMocks.quiz,
        loading: true
      }
    }
    const quizId = mockStore.quiz.quiz!._id
    const history = createMemoryHistory()

    render(
      withSwitch(<QuizRoute exact path="/quizzes/:id" />),
      mockStore,
      history
    )
    history.push(`/quizzes/${quizId}`)
    history.push('/')
    expect(clearQuizMock).toHaveBeenCalled()
  })

  it('renders a spinner if quiz is loading', () => {
    const mockStore = {
      user: stateMocks.user,
      quiz: {
        ...stateMocks.quiz,
        loading: true
      }
    }
    const quizId = mockStore.quiz.quiz!._id
    const history = createMemoryHistory()

    render(
      withSwitch(<QuizRoute exact path="/quizzes/:id" />),
      mockStore,
      history
    )
    history.push(`/quizzes/${quizId}`)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders an error page if quiz has error', () => {
    const status = 404
    const mockStore = {
      user: stateMocks.user,
      quiz: {
        ...stateMocks.quiz,
        error: {
          status,
          errors: []
        }
      }
    }
    const quizId = mockStore.quiz.quiz!._id
    const history = createMemoryHistory()

    render(
      withSwitch(<QuizRoute exact path="/quizzes/:id" />),
      mockStore,
      history
    )
    history.push(`/quizzes/${quizId + 'foo'}`)
    expect(screen.queryByText(`${status}`)).not.toBeNull()
  })

  it('renders a QuizResultList if the current user owns the quiz', () => {
    const mockStore = {
      user: stateMocks.user,
      quiz: stateMocks.quiz,
      quizResults: stateMocks.quizResults
    }
    mockStore.quiz.quiz!.user = mockStore.user.user!.username
    const quizId = mockStore.quiz.quiz!._id
    const history = createMemoryHistory()

    render(
      withSwitch(<QuizRoute exact path="/quizzes/:id" />),
      mockStore,
      history
    )
    history.push(`/quizzes/${quizId}`)
    expect(
      screen.queryByText(
        RegExp(`results for quiz "${mockStore.quiz.quiz?.title}"`, 'i')
      )
    ).not.toBeNull()
  })

  it('renders a QuizAnswerForm when the current user does not own the quiz', () => {
    const mockStore = {
      user: stateMocks.user,
      quiz: stateMocks.quiz,
      result: {
        ...stateMocks.result,
        loading: false,
        result: null
      }
    }
    mockStore.quiz.quiz!.user = 'foo'
    const quizId = mockStore.quiz.quiz!._id
    const history = createMemoryHistory()

    render(
      withSwitch(<QuizRoute exact path="/quizzes/:id" />),
      mockStore,
      history
    )
    history.push(`/quizzes/${quizId}`)
    expect(screen.getByTestId('quiz-answer-form')).not.toBeNull()
  })
})
