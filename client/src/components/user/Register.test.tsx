import React from 'react'

import { changeInput, fireEvent, render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'

jest.mock('store/auth/thunks')
import { register } from 'store/auth/thunks'
import { UserRegistration } from 'store/auth/types'

import clone from 'clone'
import * as state from 'mocks/state'
import { RootState } from 'store/store'

import Register from './Register'

describe('Register', () => {
  let mockState: Partial<RootState>
  const registerMock = mocked(register)

  beforeEach(() => {
    mockState = { auth: clone(state.auth) }
    registerMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<Register />, mockState)
  })

  it('redirects to /dashboard if user is authenticated', () => {
    mockState.auth!.isAuthenticated = true
    const history = createMemoryHistory()
    render(<Register />, mockState, history)
    expect(history.location.pathname).toEqual('/dashboard')
  })

  it('displays any errors from register callback when submitting', () => {
    mockState.auth!.isAuthenticated = false

    const usernameTakenMsg = 'Username taken'
    const passwordInvalidMsg = 'Password does not meet requirements'
    const emailTakenMsg = 'Email is in use'
    registerMock.mockImplementationOnce(function (
      { username, email, password }: UserRegistration,
      callback: (error: {} | null) => void
    ) {
      return dispatch => {
        callback({
          status: 400,
          errors: [
            { username: usernameTakenMsg },
            { password: passwordInvalidMsg },
            { email: emailTakenMsg }
          ]
        })
      }
    })

    render(<Register />, mockState)
    const value = 'abc123'.repeat(2)
    changeInput('Username', value)
    changeInput('Password', value)
    changeInput('Confirm Password', value)
    changeInput('Email', value)
    const submitBtn = screen.getByText('Register')
    fireEvent.click(submitBtn)
    expect(registerMock).toHaveBeenCalled()
    expect(screen.getByText(usernameTakenMsg)).not.toBeNull()
    expect(screen.queryByText(passwordInvalidMsg)).not.toBeNull()
    expect(screen.queryByText(emailTakenMsg)).not.toBeNull()
  })
})
