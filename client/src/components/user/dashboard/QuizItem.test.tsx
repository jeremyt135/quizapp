import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'

import clone from 'clone'

jest.mock('store/user/thunks')
import { deleteQuiz } from 'store/user/thunks'

jest.mock('store/editor/thunks')
import { goToQuizEditor } from 'store/editor/thunks'

import { QuizListing } from 'store/dashboard/types'

import * as state from 'mocks/state'
import QuizItem from './QuizItem'
import moment from 'moment'

describe('QuizItem', () => {
  const deleteQuizMock = mocked(deleteQuiz).mockReturnValue(dispatch => {})
  const goToQuizEditorMock = mocked(
    goToQuizEditor
  ).mockReturnValue(dispatch => {})
  let mockState: QuizListing[]

  beforeEach(() => {
    deleteQuizMock.mockClear()
    goToQuizEditorMock.mockClear()
    mockState = clone(state.dashboard.quizzes!)
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
    expect(screen.queryByText(`Link: quizzes/${quiz._id}`)).not.toBeNull()
  })

  it('renders the quiz created date timestamp', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/created today/i)).not.toBeNull()
  })

  it('renders the timestamp and expiration text for an expired quiz', () => {
    const quiz = mockState[0]
    quiz.expiration = moment().subtract(2, 'y').toISOString()
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/created 2 years ago/i)).not.toBeNull()
    expect(screen.queryByText(/expired/i)).not.toBeNull()
  })

  it('calls goToQuizEditor when the edit button is clicked', () => {
    render(<QuizItem quiz={mockState[0]} />)
    // activate the modal
    const editBtn = screen.getByText('Edit')
    fireEvent.click(editBtn)

    expect(goToQuizEditorMock).toHaveBeenCalled()
  })
})
