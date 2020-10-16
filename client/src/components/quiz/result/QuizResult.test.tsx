import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { mocked } from 'ts-jest/utils'

jest.mock('store/quiz/thunks')
import { getQuiz, clearQuiz } from 'store/quiz/thunks'

jest.mock('store/result/thunks')
import { getResult, clearResult } from 'store/result/thunks'

import * as state from 'mocks/state'
import { RootState } from 'store/store'

import QuizResult from './QuizResult'

describe('QuizResult', () => {
  let mockState: Partial<RootState>
  const getQuizMock = mocked(getQuiz).mockReturnValue(dispatch => {})
  const clearQuizMock = mocked(clearQuiz).mockReturnValue(dispatch => {})
  const getResultMock = mocked(getResult).mockReturnValue(dispatch => {})
  const clearResultMock = mocked(clearResult).mockReturnValue(dispatch => {})

  beforeEach(() => {
    mockState = clone(state)
    getQuizMock.mockClear()
    clearQuizMock.mockClear()
    getResultMock.mockClear()
    clearResultMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<QuizResult />, mockState)
  })

  it('renders a spinner if quiz is loading', () => {
    mockState.quiz!.loading = true
    render(<QuizResult />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if result is loading', () => {
    mockState.result!.loading = true
    render(<QuizResult />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('displays an error page if quiz has an error', () => {
    mockState.quiz!.error = { status: 404, errors: [] }
    render(<QuizResult />, mockState)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('displays an error page if result has an error', () => {
    mockState.result!.error = { status: 400, errors: [] }
    render(<QuizResult />, mockState)
    expect(screen.queryByText(/400/)).not.toBeNull()
  })

  it('renders the headline text describing the results', () => {
    render(<QuizResult />, mockState)
    expect(
      screen.queryByText(
        `${mockState.result!.result!.username}'s results for: "${
          mockState.quiz!.quiz!.title
        }"`
      )
    ).not.toBeNull()
  })

  it("renders the quiz creator's username", () => {
    render(<QuizResult />, mockState)
    expect(
      screen.queryByText(`By ${mockState.quiz!.quiz!.user}`)
    ).not.toBeNull()
  })

  it('renders the overall score as a percentage', () => {
    render(<QuizResult />, mockState)
    expect(
      screen.queryByText(
        `Overall score: ${mockState.result!.result!.score * 100.0}%`
      )
    ).not.toBeNull()
  })

  it('should render the ScoredQuestionList and its ScoredQuestions', () => {
    mockState.quiz!.quiz!.questions.push(
      clone(mockState.quiz!.quiz!.questions[0])
    )
    mockState.result!.result!.answers.push(
      clone(mockState.result!.result!.answers[0])
    )
    render(<QuizResult />, mockState)
    expect(screen.queryAllByText(/Correct answer/)).toHaveLength(
      mockState.quiz!.quiz!.questions.length
    )
  })
})
