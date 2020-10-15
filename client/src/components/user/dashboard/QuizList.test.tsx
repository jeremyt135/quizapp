import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'
import clone from 'clone'

import * as state from 'mocks/state'
import { DashboardState } from 'store/dashboard/types'
import QuizList from './QuizList'

describe('QuizList', () => {
  let mockState: DashboardState
  beforeEach(() => {
    mockState = clone(state.dashboard)
  })

  it('renders without crashing', () => {
    render(<QuizList />, { dashboard: mockState })
  })

  it('renders a spinner if state is loading', () => {
    mockState.loading = true
    render(<QuizList />, { dashboard: mockState })
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('redirects when clicking the create quiz button ', () => {
    const history = createMemoryHistory()
    render(<QuizList />, { dashboard: mockState }, history)
    const createBtn = screen.getByText(/create a quiz/i)
    fireEvent.click(createBtn)
    expect(history.location.pathname).toEqual('/quizzes/create')
  })

  it('should render whatever quizzes are availble', () => {
    mockState.quizzes?.push({
      ...clone(mockState.quizzes[0])
    })
    render(<QuizList />, { dashboard: mockState })
    expect(screen.queryAllByText(/Link:/).length).toEqual(
      mockState.quizzes!.length
    )
  })
})
