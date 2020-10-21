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

import EmailForm from './EmailForm'

describe('EmailForm', () => {
  const mockChangeUserEmail = jest.fn(async (email: string) => {
    return undefined
  })

  const renderForm = () => {
    render(
      <EmailForm
        defaultValue={initialEmail}
        changeEmail={mockChangeUserEmail}
      />
    )
  }
  it('renders without crashing', () => {
    renderForm()
  })

  it('opens the form when the change button is clicked', () => {
    renderForm()
    expect(getEmailInput()).toBeNull()
    openForm()
    expect(getEmailInput()).not.toBeNull()
  })

  it('closes the form when the cancel button is clicked', () => {
    renderForm()
    openForm()
    cancel()
    expect(getEmailInput()).toBeNull()
  })

  it('shows an error if submitting current email', () => {
    renderForm()
    openForm()
    changeEmailInput(initialEmail)
    submit()
    expect(
      screen.queryByText(/You are already using this email/)
    ).toBeInTheDocument()
  })

  it('opens the confirmation modal if new email submitted', () => {
    renderForm()
    openForm()
    changeEmailInput('foo' + initialEmail)
    submit()
    expect(screen.queryByTestId('confirm-modal')).toBeInTheDocument()
  })

  it('calls changeUserEmail when modal is confirmed', async () => {
    renderForm()
    openForm()
    changeEmailInput('foo' + initialEmail)
    submit()
    confirm()
    await waitFor(() => expect(mockChangeUserEmail).toHaveBeenCalled())
  })
})

const initialEmail = 'user@email.com'

const openForm = () => {
  fireEvent.click(screen.getByText('Change Email'))
}
const getEmailInput = () => {
  return screen.queryByPlaceholderText('New email') as Element
}
const changeEmailInput = (email: string) => {
  changeInput('New email', email)
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
