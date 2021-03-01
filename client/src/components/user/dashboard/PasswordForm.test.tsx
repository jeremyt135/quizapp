import React from 'react'

import '@testing-library/jest-dom'
import {
  changeInput,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from 'util/test-utils'

import PasswordForm from './PasswordForm'

describe('PasswordForm', () => {
  const mockChangeUserPassword = jest.fn(async password => {
    return undefined
  })

  const renderForm = () =>
    render(
      <PasswordForm
        changePassword={password => mockChangeUserPassword(password)}
      />
    )

  it('renders without crashing', () => {
    renderForm()
  })

  it('opens the form when the change button is clicked', () => {
    renderForm()
    openForm()
    expect(getPasswordInput()).not.toBeNull()
  })

  it('closes the form when the cancel button is clicked', () => {
    renderForm()
    openForm()
    cancel()
    expect(getPasswordInput()).toBeNull()
  })

  it('closes the form when the cancel button is clicked', () => {
    renderForm()
    openForm()
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(getPasswordInput()).toBeNull()
  })

  it('shows an error if passwords do not match', () => {
    renderForm()
    openForm()
    fillOutForm(newPassword, newPassword + 'foo')
    submit()
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('shows an error if first password input is empty', () => {
    renderForm()
    openForm()
    fillOutForm('', newPassword)
    submit()
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument()
  })

  it('shows an error if confirmation input is empty', () => {
    renderForm()
    openForm()
    fillOutForm(newPassword, '')
    submit()
    expect(screen.queryByText(/please enter a password/i)).toBeInTheDocument()
  })

  it('opens the confirmation modal if passwords match', () => {
    renderForm()
    openForm()
    fillOutForm(newPassword, newPassword)
    submit()
    expect(screen.queryByTestId('confirm-modal')).toBeInTheDocument()
  })

  it('calls changeUserPassword when modal is confirmed', async () => {
    renderForm()
    openForm()
    fillOutForm(newPassword, newPassword)
    submit()
    confirm()
    await waitFor(() => expect(mockChangeUserPassword).toHaveBeenCalled())
  })
})

const newPassword = 'password'

const openForm = () => {
  fireEvent.click(screen.getByText('Change Password'))
}

const getPasswordInput = () => {
  return screen.queryByPlaceholderText('New password')
}
const changePasswordInput = (password: string) => {
  changeInput('New password', password)
}
const changeConfirmInput = (password: string) => {
  changeInput('Confirm new password', password)
}

const cancel = () => {
  fireEvent.click(screen.getByText('Cancel'))
}

const submit = () => {
  fireEvent.click(screen.getByText('Change'))
}

const confirm = () => {
  const { getByText } = within(screen.getByRole('dialog'))
  fireEvent.click(getByText('Confirm'))
}

const fillOutForm = (password: string, confirmPassword: string) => {
  changePasswordInput(password)
  changeConfirmInput(confirmPassword)
}
