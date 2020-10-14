import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'
jest.mock('util/jwt')
import { tokenIsExpired } from 'util/jwt'

import PrivateRoute from './PrivateRoute'
import { AuthState } from 'store/auth/types'
import { UserState } from 'store/user/types'

describe('Navbar', () => {
  const tokenIsExpiredMock = mocked(tokenIsExpired)
  const FakeComponent = jest.fn(() => <p>FakeComponent</p>)
  const mockAuth: AuthState = {
    token: '',
    isAuthenticated: false
  }
  const mockUser: UserState = {
    loading: false,
    error: null,
    user: {
      _id: 'id',
      date: 'date',
      username: 'username',
      email: 'email@email.com',
      quizzes: [],
      results: []
    }
  }
  beforeEach(() => {
    tokenIsExpiredMock.mockClear()
    FakeComponent.mockClear()
  })

  it('renders without crashing', () => {
    const mockStore = {
      auth: mockAuth
    }
    render(<PrivateRoute exact path="/" component={FakeComponent} />, mockStore)
  })

  it('does not call/render the render prop if unauthenticated', () => {
    const mockStore = {
      auth: {
        token: '',
        isAuthenticated: false
      }
    }
    render(<PrivateRoute component={FakeComponent} />, mockStore)
    expect(FakeComponent).not.toHaveBeenCalled()
  })
  it('does not render if authenticated but token is expired', () => {
    const mockStore = {
      auth: {
        ...mockAuth,
        isAuthenticated: true
      }
    }
    tokenIsExpiredMock.mockReturnValueOnce(true)
    render(<PrivateRoute exact path="/" component={FakeComponent} />, mockStore)
    expect(tokenIsExpiredMock).toHaveBeenCalled()
    expect(FakeComponent).not.toHaveBeenCalled()
  })

  it('calls/renders the render prop when user is authenticated and not loading', () => {
    const mockStore = {
      auth: {
        ...mockAuth,
        isAuthenticated: true
      },
      user: mockUser
    }
    render(<PrivateRoute component={FakeComponent} />, mockStore)
    expect(FakeComponent).toHaveBeenCalled()
  })

  it('renders spinner if authenticated but user is loading', () => {
    const mockStore = {
      auth: {
        ...mockAuth,
        isAuthenticated: true
      },
      user: {
        ...mockUser,
        loading: true
      }
    }
    render(<PrivateRoute component={FakeComponent} />, mockStore)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('redirects the user if not authenticated', () => {
    const mockStore = {
      auth: mockAuth
    }
    const history = createMemoryHistory()
    render(<PrivateRoute component={FakeComponent} />, mockStore, history)
    expect(history.location.pathname).toEqual('/login')
  })
})
