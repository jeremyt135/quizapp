import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'

import * as state from 'mocks/state'
import { DashboardState } from 'store/dashboard/types'
import ResultList from './ResultList'

describe('ResultList', () => {
  let mockState: DashboardState
  beforeEach(() => {
    mockState = clone(state.dashboard)
  })

  it('renders without crashing', () => {
    render(<ResultList />, { dashboard: mockState })
  })

  it('renders a spinner if state is loading', () => {
    mockState.loading = true
    render(<ResultList />, { dashboard: mockState })
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('should display a message if no results are made', () => {
    mockState.results = []
    render(<ResultList />, { dashboard: mockState })
    expect(screen.queryByText(/you haven't taken any quizzes/i)).not.toBeNull()
  })

  it('should render whatever results are availble', () => {
    mockState.results?.push({
      ...clone(mockState.results[0])
    })
    render(<ResultList />, { dashboard: mockState })
    expect(screen.queryAllByText(/Score:/).length).toEqual(
      mockState.results!.length
    )
  })
})
