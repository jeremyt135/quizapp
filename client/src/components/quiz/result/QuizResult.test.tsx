import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { mocked } from 'ts-jest/utils'

import { quiz, result } from 'mocks/state'

jest.mock('hooks/usequiz')
import { useQuiz } from 'hooks/usequiz'

jest.mock('hooks/useresult')
import { useSingleResult } from 'hooks/useresult'

import QuizResult from './QuizResult'

describe('QuizResult', () => {
  const mockUseQuiz = mocked(useQuiz)
  const mockUseSingleResult = mocked(useSingleResult)
  const mockQuiz = quiz
  const mockResult = result
  const mockError404 = { status: 404, errors: [] }
  const mockError400 = { status: 400, errors: [] }

  beforeEach(() => {
    mockUseQuiz.mockReset()
    mockUseSingleResult.mockReset()
  })

  it('renders without crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    render(<QuizResult />)
  })

  it('renders a spinner if quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([undefined, undefined, true])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    render(<QuizResult />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if result is loading', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, true])
    render(<QuizResult />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('displays an error page if quiz has an error', () => {
    mockUseQuiz.mockReturnValue([undefined, mockError404, false])
    mockUseSingleResult.mockReturnValue([mockResult, undefined, false])
    render(<QuizResult />)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('displays an error page if result has an error', () => {
    mockUseQuiz.mockReturnValue([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValue([undefined, mockError400, false])
    render(<QuizResult />)
    expect(screen.queryByText(/400/)).not.toBeNull()
  })

  it('renders the headline text describing the results', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    render(<QuizResult />)
    expect(
      screen.queryByText(
        `${mockResult.username}'s results for: "${mockQuiz.title}"`
      )
    ).not.toBeNull()
  })

  it("renders the quiz creator's username", () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    render(<QuizResult />)
    expect(screen.queryByText(`By ${mockQuiz.user}`)).not.toBeNull()
  })

  it('renders the overall score as a percentage', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    render(<QuizResult />)
    expect(
      screen.queryByText(`Overall score: ${mockResult.score * 100.0}%`)
    ).not.toBeNull()
  })

  it('should render the ScoredQuestionList and its ScoredQuestions', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    render(<QuizResult />)
    expect(screen.queryAllByText(/Correct answer/)).toHaveLength(
      mockQuiz.questions.length
    )
  })
})
