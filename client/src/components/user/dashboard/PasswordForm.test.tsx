import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'

jest.mock('store/user/thunks')
import { changeUserPassword } from 'store/user/thunks'

import PasswordForm from './PasswordForm'

describe('EmailForm', () => {
  it('renders without crashing', () => {
    //@ts-ignore
    render(<PasswordForm />)
  })

  it('opens the form when the change button is clicked', () => {
    //@ts-ignore
    render(<PasswordForm />)

    expect(getPasswordInput()).toBeNull()
    openForm()
    expect(getPasswordInput()).not.toBeNull()
  })

  it('closes the form when the cancel button is clicked', () => {
    //@ts-ignore
    render(<PasswordForm />)
    openForm()
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(getPasswordInput()).toBeNull()
  })

  it('shows an error if passwords do not match', () => {
    //@ts-ignore
    render(<PasswordForm />)
    openForm()
    fillOutForm(newPassword, newPassword + 'foo')
    fireEvent.click(getSubmitButton())
    expect(screen.queryByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('shows an error if first password input is empty', () => {
    //@ts-ignore
    render(<PasswordForm />)
    openForm()
    fillOutForm('', newPassword)
    fireEvent.click(getSubmitButton())
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument()
  })

  it('shows an error if confirmation input is empty', () => {
    //@ts-ignore
    render(<PasswordForm />)
    openForm()
    fillOutForm(newPassword, '')
    fireEvent.click(getSubmitButton())
    expect(screen.queryByText(/please enter a password/i)).toBeInTheDocument()
  })

  it('opens the confirmation modal if passwords match', () => {
    //@ts-ignore
    render(<PasswordForm />)
    openForm()
    fillOutForm(newPassword, newPassword)
    fireEvent.click(getSubmitButton())
    expect(screen.queryByTestId('confirm-modal')).toBeInTheDocument()
  })

  it('calls changeUserPassword when modal is confirmed', () => {
    //@ts-ignore
    render(<PasswordForm />)
    openForm()
    fillOutForm(newPassword, newPassword)
    fireEvent.click(getSubmitButton())
    const confirmChangeBtn = screen.getAllByText('Confirm Changes')[1]
    fireEvent.click(confirmChangeBtn)
    expect(changeUserPasswordMock).toHaveBeenCalled()
  })
})
const newPassword = 'password'

const changeUserPasswordMock = mocked(
  changeUserPassword
).mockReturnValue(dispatch => {})

const openForm = () => {
  const changeBtn = screen.getByText('Change Password')
  fireEvent.click(changeBtn)
}

const getPasswordInput = () => {
  return screen.queryByPlaceholderText('New password') as Element
}
const getConfirmInput = () => {
  return screen.queryByPlaceholderText('Confirm new password') as Element
}
const getSubmitButton = () => {
  return screen.getByText('Change') as Element
}

const fillOutForm = (password: string, confirmPassword: string) => {
  const passwordInput = getPasswordInput()
  fireEvent.change(passwordInput, { target: { value: password } })
  const confirmInput = getConfirmInput()
  fireEvent.change(confirmInput, { target: { value: confirmPassword } })
}
