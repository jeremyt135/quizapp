import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'
import { mocked } from 'ts-jest/utils'

jest.mock('store/user/thunks')
import { changeUserEmail } from 'store/user/thunks'

import EmailForm from './EmailForm'

describe('EmailForm', () => {
  const changeUserEmailMock = mocked(
    changeUserEmail
  ).mockReturnValue(dispatch => {})
  const initialEmail = 'user@email.com'
  const openForm = () => {
    const changeBtn = screen.getByText('Change Email')
    fireEvent.click(changeBtn)
  }
  const getEmailInput = () => {
    return screen.queryByPlaceholderText('New email') as Element
  }
  const getSubmitButton = () => {
    return screen.queryByText('Confirm') as Element
  }
  it('renders without crashing', () => {
    render(<EmailForm initialEmail={initialEmail} />)
  })

  it('opens the form when the change button is clicked', () => {
    render(<EmailForm initialEmail={initialEmail} />)

    expect(getEmailInput()).toBeNull()
    openForm()
    expect(getEmailInput()).not.toBeNull()
  })

  it('closes the form when the cancel button is clicked', () => {
    render(<EmailForm initialEmail={initialEmail} />)
    openForm()
    const cancelBtn = screen.getByText('Cancel')
    fireEvent.click(cancelBtn)
    expect(getEmailInput()).toBeNull()
  })

  it('shows an error if submitting current email', () => {
    render(<EmailForm initialEmail={initialEmail} />)
    openForm()
    const emailInput = getEmailInput()
    fireEvent.change(emailInput, { target: { value: initialEmail } })
    fireEvent.click(getSubmitButton())
    expect(
      screen.queryByText(/You are already using this email/)
    ).toBeInTheDocument()
  })

  it('opens the confirmation modal if new email submitted', () => {
    render(<EmailForm initialEmail={initialEmail} />)
    openForm()
    const emailInput = getEmailInput()
    fireEvent.change(emailInput, { target: { value: 'foo' + initialEmail } })
    fireEvent.click(getSubmitButton())
    expect(screen.queryByTestId('confirm-modal')).toBeInTheDocument()
  })

  it('calls changeUserEmail when modal is confirmed', () => {
    render(<EmailForm initialEmail={initialEmail} />)
    openForm()
    const emailInput = getEmailInput()
    fireEvent.change(emailInput, { target: { value: 'foo' + initialEmail } })
    fireEvent.click(getSubmitButton())
    const confirmChangeBtn = screen.getAllByText('Confirm Changes')[1]
    fireEvent.click(confirmChangeBtn)
    expect(changeUserEmailMock).toHaveBeenCalled()
  })
})
