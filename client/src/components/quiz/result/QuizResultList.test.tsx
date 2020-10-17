import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { mocked } from 'ts-jest/utils'

jest.mock('store/quiz/thunks')
import { getQuiz, clearQuiz } from 'store/quiz/thunks'

jest.mock('store/quizresults/thunks')
import { getQuizResults, clearQuizResults } from 'store/quizresults/thunks'

import * as state from 'mocks/state'
import { RootState } from 'store/store'

import QuizResultList from './QuizResultList'

describe('QuizResultList', () => {
  let mockState: Partial<RootState>
  const getQuizMock = mocked(getQuiz).mockReturnValue(() => {})
  const getQuizResultsMock = mocked(getQuizResults).mockReturnValue(() => {})
  const clearQuizMock = mocked(clearQuiz).mockReturnValue(() => {})
  const clearQuizResultsMock = mocked(
    clearQuizResults
  ).mockReturnValue(() => {})

  beforeEach(() => {
    mockState = {
      quiz: clone(state.quiz),
      quizResults: clone(state.quizResults)
    }
  })

  it('renders witout crashing', () => {
    render(<QuizResultList />, mockState)
  })

  it('renders a spinner if quiz is loading', () => {
    mockState.quiz!.loading = true
    render(<QuizResultList />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if quizResults is loading', () => {
    mockState.quizResults!.loading = true
    render(<QuizResultList />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders an error page if quizResults has an error', () => {
    mockState.quizResults!.error = { status: 404, errors: [] }
    render(<QuizResultList />, mockState)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('renders an error page if quiz has an error', () => {
    mockState.quiz!.error = { status: 404, errors: [] }
    render(<QuizResultList />, mockState)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('displays the quiz title headline', () => {
    render(<QuizResultList />, mockState)
    expect(
      screen.queryByText(RegExp(`${mockState.quiz!.quiz!.title}`))
    ).not.toBeNull()
  })

  it('displays a message if nobody has responded to the quiz', () => {
    mockState.quizResults!.results = []
    render(<QuizResultList />, mockState)
    expect(screen.queryByText(/nobody has responded/i)).not.toBeNull()
  })

  it('should render a ResultItem for each result', () => {
    render(<QuizResultList />, mockState)
    expect(screen.queryAllByText(/details/i)).toHaveLength(
      mockState!.quizResults!.results!.length
    )
  })
})
