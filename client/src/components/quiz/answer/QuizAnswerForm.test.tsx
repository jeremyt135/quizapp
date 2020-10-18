import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import clone from 'clone'
import { mocked } from 'ts-jest/utils'

import moment from 'moment'
import { createMemoryHistory } from 'history'

jest.mock('hooks/usequiz')
import { useQuiz } from 'hooks/usequiz'

jest.mock('hooks/useresult')
import { useSingleResult } from 'hooks/useresult'

jest.mock('api')
import Api from 'api'

import { user, quiz, result } from 'mocks/state'

import QuizAnswerForm from './QuizAnswerForm'

describe('QuizAnswerForm', () => {
  const mockUseQuiz = mocked(useQuiz)
  const mockUseSingleResult = mocked(useSingleResult)
  const mockQuiz = quiz.quiz!
  const mockResult = result.result!
  const mockError404 = { status: 404, errors: [] }
  const mockError400 = { status: 400, errors: [] }
  const mockError403 = { status: 403, errors: [] }

  const history = createMemoryHistory()
  const renderForm = () => render(<QuizAnswerForm />, { user }, history)

  beforeEach(() => {
    if (!history.location.pathname.startsWith('/quizzes')) {
      history.push('/quizzes/1234-5678')
    }
    mockUseQuiz.mockReset()
    mockUseSingleResult.mockReset()
  })

  it('renders without crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, false])
    renderForm()
  })

  it('renders a spinner if the quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([undefined, undefined, true])
    mockUseSingleResult.mockReturnValueOnce([undefined, mockError404, false])
    renderForm()
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if the result is loading', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, true])
    renderForm()
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('displays the title and creator of the quiz', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, false])
    renderForm()
    expect(screen.getByText(RegExp(`${mockQuiz.user}`))).not.toBeNull()
    expect(screen.queryByText(mockQuiz.title)).not.toBeNull()
  })

  it('renders QuizExpiredError if error indicates expired quiz', () => {
    mockUseQuiz.mockReturnValueOnce([
      undefined,
      { ...mockError403, errors: [{ expiration: 'expired' }] },
      false
    ])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, false])
    renderForm()
    expect(screen.queryByText(/quiz has expired/i)).not.toBeNull()
  })

  it('renders a generic error page if quiz error is not 403 or 400', () => {
    mockUseQuiz.mockReturnValueOnce([undefined, mockError404, false])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, false])
    renderForm()
    expect(screen.getByText(/404/)).not.toBeNull()
  })

  it('renders QuizExpiredError if quiz is expired (but quiz has no error)', () => {
    const expiration = moment().subtract(1, 'd').toISOString()
    mockUseQuiz.mockReturnValueOnce([
      { ...mockQuiz, expiration },
      undefined,
      false
    ])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, false])
    renderForm()
    expect(screen.queryByText(/quiz has expired/i)).not.toBeNull()
  })

  it('renders QuizTakenError if user has taken quiz', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, undefined, false])
    renderForm()
    expect(screen.queryByText(/already taken this quiz/i)).not.toBeNull()
  })

  it('redirects to /dashboard if cancel is clicked', () => {
    mockUseQuiz.mockReturnValue([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValue([undefined, undefined, false])
    renderForm()
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(history.location.pathname).toEqual('/dashboard')
  })

  it('calls Api.results.post when clicking submit', () => {
    mockUseQuiz.mockReturnValue([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValue([undefined, undefined, false])
    renderForm()
    const mockResultsPost = mocked(Api.results.post).mockResolvedValue({})
    const submitbtn = screen.getByText('Submit')
    fireEvent.click(submitbtn)
    expect(mockResultsPost).toHaveBeenCalled()
  })

  it('renders the QuestionList', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    mockUseSingleResult.mockReturnValueOnce([undefined, undefined, false])
    renderForm()
    expect(screen.queryByTestId('questionlist')).not.toBeNull()
  })
})
