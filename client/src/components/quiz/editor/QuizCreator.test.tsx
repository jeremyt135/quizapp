import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from 'util/test-utils'

import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'

import moment from 'moment'
import clone from 'clone'

jest.mock('store/alerts/thunks')
import { createAlert } from 'store/alerts/thunks'

import { Quiz } from 'api'

import QuizCreator from './QuizCreator'

const quiz: Quiz = {
  _id: 'quizid',
  title: '',
  isPublic: true,
  allowedUsers: [],
  expiration: moment().add(1, 'd').toISOString(),
  questions: []
}

describe('QuizCreator', () => {
  let mockQuiz: Quiz
  const mockCreateAlert = mocked(createAlert).mockReturnValue(() => {})

  beforeEach(() => {
    mockCreateAlert.mockClear()
    mockQuiz = clone(quiz)
    fetchMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<QuizCreator />)
  })

  it('redirects to /dashboard and creates an alert after successful submit', async () => {
    const history = createMemoryHistory()

    render(<QuizCreator />, { alerts: [] }, history)
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200
    })

    const submitBtn = screen.getByText('Submit')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/dashboard')
      expect(mockCreateAlert).toHaveBeenCalled()
    })
  })

  it('shows validation errors if the submission failed', async () => {
    const history = createMemoryHistory()

    render(<QuizCreator />, {}, history)
    fetchMock.mockResponseOnce(JSON.stringify({ errors: [] }), {
      status: 400
    })

    const submitBtn = screen.getByText('Submit')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter at least one character/i)
      ).not.toBeNull()
    })
  })
})
