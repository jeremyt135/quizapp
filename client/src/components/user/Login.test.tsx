import React from 'react'

import { changeInput, fireEvent, render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'

jest.mock('store/auth/thunks')
import { login } from 'store/auth/thunks'
import { UserLogin } from 'store/auth/types'

import clone from 'clone'
import * as state from 'mocks/state'
import { RootState } from 'store/store'

import Login from './Login'

describe('Login', () => {
  let mockState: Partial<RootState>
  const loginMock = mocked(login)

  beforeEach(() => {
    mockState = { auth: clone(state.auth) }
    loginMock.mockClear()
  })

  it('renders without crashing', () => {
    mockState.auth!.isAuthenticated = false
    render(<Login />, mockState)
  })

  it('redirects to /dashboard if user is authenticated', () => {
    mockState.auth!.isAuthenticated = true
    const history = createMemoryHistory()
    render(<Login />, mockState, history)
    expect(history.location.pathname).toEqual('/dashboard')
  })

  it('displays any errors from login callback when submitting', () => {
    mockState.auth!.isAuthenticated = false

    const usernameTakenMsg = 'Username does not exist'
    const passwordInvalidMsg = 'Password invalid'

    loginMock.mockImplementationOnce(function (
      { username, password }: UserLogin,
      callback: (error: {} | null) => void
    ) {
      return dispatch => {
        callback({
          status: 400,
          errors: [
            { username: usernameTakenMsg },
            { password: passwordInvalidMsg }
          ]
        })
      }
    })

    render(<Login />, mockState)

    const value = 'abc123'.repeat(2)
    changeInput('Username', value)
    changeInput('Password', value)

    const submitBtn = screen.getByText('Login')
    fireEvent.click(submitBtn)
    expect(loginMock).toHaveBeenCalled()
    expect(screen.getByText(usernameTakenMsg)).not.toBeNull()
    expect(screen.queryByText(passwordInvalidMsg)).not.toBeNull()
  })
})
