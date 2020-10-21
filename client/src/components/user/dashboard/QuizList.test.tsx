import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'
import { createMemoryHistory } from 'history'
import clone from 'clone'

import { quizzes } from 'mocks/state'

import QuizList from './QuizList'
import { QuizListing } from 'api'

describe('QuizList', () => {
  let mockState: { quizzes: QuizListing[]; loading: boolean }
  beforeEach(() => {
    mockState = { quizzes: clone(quizzes), loading: false }
  })

  const renderList = () => {
    render(
      <QuizList loading={mockState.loading} quizzes={mockState.quizzes ?? []} />
    )
  }

  it('renders without crashing', () => {
    renderList()
  })

  it('renders a spinner if state is loading', () => {
    mockState.loading = true
    renderList()
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('redirects when clicking the create quiz button', () => {
    const history = createMemoryHistory()
    render(
      <QuizList
        loading={mockState.loading}
        quizzes={mockState.quizzes ?? []}
      />,
      {},
      history
    )
    const createBtn = screen.getByText(/create a quiz/i)
    fireEvent.click(createBtn)
    expect(history.location.pathname).toEqual('/quizzes/create')
  })

  it('should display a message if no quizzes are made', () => {
    mockState.quizzes = []
    renderList()
    expect(screen.queryByText(/you haven't made any quizzes/i)).not.toBeNull()
  })

  it('should render whatever quizzes are availble', () => {
    mockState.quizzes?.push({
      ...clone(mockState.quizzes[0])
    })
    renderList()
    expect(screen.queryAllByText(/Link:/).length).toEqual(
      mockState.quizzes!.length
    )
  })
})
