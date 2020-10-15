import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'

import clone from 'clone'

jest.mock('store/user/thunks')
import { deleteUser } from 'store/user/thunks'

import { dateToLongLocaleString } from 'util/date'

import * as state from 'mocks/state'

import UserInfo from './UserInfo'

describe('UserInfo', () => {
  const deleteUserMock = mocked(deleteUser).mockReturnValue(dispatch => {})
  let mockState: typeof state

  beforeEach(() => {
    deleteUserMock.mockClear()
    mockState = clone(state)
  })

  it('renders without crashing', () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
  })

  it('renders the email form', () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
    expect(screen.queryByText(/change email/i)).not.toBeNull()
  })

  it('renders the password form', () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
    expect(screen.queryByText(/change password/i)).not.toBeNull()
  })

  it('renders the delete account button', () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
    expect(screen.queryByText(/delete account/i)).not.toBeNull()
  })

  it("renders the user's username", () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
    expect(
      screen.queryByText(RegExp(`${mockState.user.user?.username}`))
    ).not.toBeNull()
  })

  it("renders the user's email", () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
    expect(
      screen.queryByText(RegExp(`${mockState.user.user?.email}`))
    ).not.toBeNull()
  })

  it("renders the user's registration date", () => {
    //@ts-ignore
    render(<UserInfo />, mockState)
    const date = dateToLongLocaleString(mockState.user.user!.date)
    expect(screen.getByText(date)).not.toBeNull()
  })
})
