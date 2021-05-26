import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen, within } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'
import clone from 'clone'

jest.mock('store/user/thunks')
import { deleteQuiz } from 'store/user/thunks'

import { QuizListing } from 'api'

import { quizzes } from 'mocks/state'
import QuizItem from './QuizItem'
import moment from 'moment'

describe('QuizItem', () => {
  const deleteQuizMock = mocked(deleteQuiz).mockReturnValue(async dispatch => {})
  let mockState: QuizListing[]

  beforeEach(() => {
    deleteQuizMock.mockClear()
    mockState = clone(quizzes)
  })

  it('renders without crashing', () => {
    render(<QuizItem quiz={mockState[0]} />)
  })

  it('renders the quiz title, questionCount, and resultsCount', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(quiz.title)).not.toBeNull()
    expect(screen.queryByText(`${quiz.questionCount} Question`)).not.toBeNull()
    expect(screen.queryByText(`${quiz.resultsCount} Response`)).not.toBeNull()
  })

  it('renders the quiz link', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.getByText(`/quizzes/${quiz._id}`)).not.toBeNull()
  })

  it('renders the quiz created date timestamp', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/created today/i)).not.toBeNull()
  })

  it('renders the timestamp correctly for old quizzes', () => {
    const quiz = mockState[0]
    quiz.date = moment().subtract(2, 'y').toISOString()
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/created 2 years ago/i)).not.toBeNull()
  })

  it('renders the expiration text for an expired quiz', () => {
    const quiz = mockState[0]
    quiz.expiration = moment().subtract(2, 'y').toISOString()
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/expired/i)).not.toBeNull()
  })

  it('redirects to the quiz editor when the edit button is clicked', () => {
    const history = createMemoryHistory()
    render(<QuizItem quiz={mockState[0]} />, {}, history)

    const editBtn = screen.getByText('Edit')
    fireEvent.click(editBtn)

    expect(history.location.pathname + history.location.search).toEqual(
      `/quizzes/${mockState[0]._id}/edit`
    )
  })

  it('calls deleteQuiz when confirming modal delete button', () => {
    render(<QuizItem quiz={mockState[0]} />)

    // Click delete and confirm the modal
    fireEvent.click(screen.getByText('Delete'))
    const { getByText } = within(screen.getByRole('dialog'))
    fireEvent.click(getByText(/yes, delete/i))

    expect(deleteQuizMock).toHaveBeenCalled()
  })
})
