import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import clone from 'clone'
import { mocked } from 'ts-jest/utils'
import moment from 'moment'
import { createMemoryHistory } from 'history'

jest.mock('store/quiz/thunks')
import { getQuiz, clearQuiz, postQuizAnswers } from 'store/quiz/thunks'

jest.mock('store/result/thunks')
import { getResult, clearResult } from 'store/result/thunks'

import * as state from 'mocks/state'
import { RootState } from 'store/store'

import QuizAnswerForm from './QuizAnswerForm'

describe('QuizAnswerForm', () => {
  let mockState: Partial<RootState>
  const getQuizMock = mocked(getQuiz).mockReturnValue(dispatch => {})
  const clearQuizMock = mocked(clearQuiz).mockReturnValue(dispatch => {})
  const postQuizAnswersMock = mocked(
    postQuizAnswers
  ).mockReturnValue(dispatch => {})
  const getResultMock = mocked(getResult).mockReturnValue(dispatch => {})
  const clearResultMock = mocked(clearResult).mockReturnValue(dispatch => {})

  beforeEach(() => {
    mockState = clone(state)
    mockState.result!.result = null
    getQuizMock.mockClear()
    clearQuizMock.mockClear()
    postQuizAnswersMock.mockClear()
    getResultMock.mockClear()
    clearResultMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<QuizAnswerForm />, mockState)
  })

  it('displays the title and creator of the quiz', () => {
    render(<QuizAnswerForm />, mockState)
    expect(
      screen.getByText(RegExp(`${mockState.quiz!.quiz!.user}`))
    ).not.toBeNull()
    expect(screen.queryByText(mockState.quiz!.quiz!.title)).not.toBeNull()
  })

  it('renders a spinner if the quiz is loading', () => {
    mockState.quiz!.loading = true
    render(<QuizAnswerForm />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders QuizExpiredError if error indicates expired quiz', () => {
    mockState.quiz!.error = { status: 403, errors: [{ expiration: '' }] }
    render(<QuizAnswerForm />, mockState)
    expect(screen.queryByText(/quiz has expired/i)).not.toBeNull()
  })

  it('renders a generic error page if error is not 403 or 400', () => {
    mockState.quiz!.error = { status: 404, errors: [] }
    render(<QuizAnswerForm />, mockState)
    expect(screen.getByText(/404/)).not.toBeNull()
  })

  it('renders QuizExpiredError if quiz is expired', () => {
    mockState.quiz!.quiz!.expiration = moment().subtract(1, 'd').toISOString()
    render(<QuizAnswerForm />, mockState)
    expect(screen.queryByText(/quiz has expired/i)).not.toBeNull()
  })

  it('renders QuizTakenError if user has taken quiz', () => {
    mockState.result = clone(state.result)
    render(<QuizAnswerForm />, mockState)
    expect(screen.queryByText(/already taken this quiz/i)).not.toBeNull()
  })

  it('redirects to /dashboard if cancel is clicked', () => {
    mockState.result!.result = null
    const history = createMemoryHistory()
    render(<QuizAnswerForm />, mockState, history)
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(history.location.pathname).toEqual('/dashboard')
  })

  it('calls postQuizAnswers when clicking submit', () => {
    mockState.result!.result = null
    render(<QuizAnswerForm />, mockState)
    const submitbtn = screen.getByText('Submit')
    fireEvent.click(submitbtn)
    expect(postQuizAnswersMock).toHaveBeenCalled()
  })

  it('renders the QuestionList', () => {
    render(<QuizAnswerForm />, mockState)
    expect(screen.queryByTestId('questionlist')).not.toBeNull()
  })
})
