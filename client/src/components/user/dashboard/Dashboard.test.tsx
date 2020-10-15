import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'
import { createMemoryHistory } from 'history'

import clone from 'clone'

import * as state from 'mocks/state'

import Dashboard from './Dashboard'
import { RootState } from 'store/store'

describe('Dashboard', () => {
  let mockState: Partial<RootState>
  beforeEach(() => {
    mockState = clone(state)
  })
  it('renders without crashing', () => {
    render(<Dashboard />, mockState)
  })
  it('renders a spinner if user is loading', () => {
    mockState.user!.loading = true
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })
  it('redirects to login page if user is unauthenticated', () => {
    mockState.auth!.isAuthenticated = false
    const history = createMemoryHistory()
    render(<Dashboard />, mockState, history)
    expect(history.location.pathname).toEqual('/login')
  })
  it('renders user info', () => {
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByText(/hello/i)).not.toBeNull()
    expect(screen.queryByText(/email:/i)).not.toBeNull()
    expect(screen.queryByText(/joined/i)).not.toBeNull()
  })
  it('renders the quiz list', () => {
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByText(/quizzes you created/i)).not.toBeNull()
  })
  it('renders the result list', () => {
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByText(/your quiz results/i)).not.toBeNull()
  })
})
