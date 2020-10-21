import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from 'util/test-utils'

import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'

import moment from 'moment'
import clone from 'clone'

jest.mock('hooks/usequiz')
import { useQuiz } from 'hooks/usequiz'

jest.mock('store/alerts/thunks')
import { createAlert } from 'store/alerts/thunks'

jest.mock('store/user/thunks')
import { loadUser } from 'store/user/thunks'

import { Quiz } from 'api'

import QuizEditor from './QuizEditor'

const quiz: Quiz = {
  _id: 'quizid',
  title: '',
  date: moment().toISOString(),
  isPublic: true,
  allowedUsers: [],
  expiration: moment().add(1, 'd').toISOString(),
  questions: []
}

describe('QuizEditor', () => {
  let mockQuiz: Quiz
  const mockUseQuiz = mocked(useQuiz).mockReturnValue([
    undefined,
    undefined,
    false
  ])
  const mockCreateAlert = mocked(createAlert).mockReturnValue(() => {})
  const mockLoadUser = mocked(loadUser).mockReturnValue(async dispatch => {})

  beforeEach(() => {
    mockUseQuiz.mockClear()
    mockCreateAlert.mockClear()
    mockQuiz = clone(quiz)
    fetchMock.mockClear()
  })

  it('renders without crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])
    render(<QuizEditor />)
  })

  it('renders a Spinner if quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([undefined, undefined, true])
    render(<QuizEditor />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('redirects to /dashboard and creates an alert after successful submit', async () => {
    const history = createMemoryHistory()
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])

    render(<QuizEditor />, { alerts: [] }, history)
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200
    })

    const submitBtn = screen.getByText('Confirm Edits')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/dashboard')
      expect(mockCreateAlert).toHaveBeenCalled()
    })
  })

  it('shows validation errors if the submission failed', async () => {
    const history = createMemoryHistory()
    mockUseQuiz.mockReturnValueOnce([mockQuiz, undefined, false])

    render(<QuizEditor />, {}, history)
    fetchMock.mockResponseOnce(JSON.stringify({ errors: [] }), {
      status: 400
    })

    const submitBtn = screen.getByText('Confirm Edits')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter at least one character/i)
      ).not.toBeNull()
    })
  })
})
