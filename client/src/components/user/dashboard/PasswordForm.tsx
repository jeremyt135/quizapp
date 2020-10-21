import React, { useCallback, useState } from 'react'

import { ApiError } from 'api'
import { useConfirmModal } from 'hooks/useconfirmmodal'

type Props = {
  changePassword: (password: string) => Promise<ApiError | undefined>
}

/**
 * Displays and controls a form for the user to change their password.
 */
const PasswordForm = ({ changePassword }: Props) => {
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    confirmPassword: ''
  })

  const { password, confirmPassword } = passwordInput

  const [isOpen, setIsOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const closeForm = () => {
    setPasswordInput({ password: '', confirmPassword: '' })
    setIsOpen(false)
    setFormError(null)
  }

  const openForm = () => {
    setFormError(null)
    setIsOpen(true)
  }

  const onConfirm = useCallback(() => {
    changePassword(password).then(apiError => {
      if (apiError) {
        setFormError('Cannot change password at this time.')
      } else {
        closeForm()
      }
    })
  }, [password])

  const [Modal, , showModal] = useConfirmModal({
    header: 'Confirm Changes',
    body: 'Are you sure you want to change email?',
    onConfirm: onConfirm
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError('')
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        showModal()
      } else {
        setFormError('Passwords do not match.')
      }
    } else {
      setFormError('Please enter a password.')
    }
  }

  return (
    <>
      {!isOpen ? (
        <div className="row my-2">
          <div className="col">
            <button className="btn btn-info btn-sm" onClick={openForm}>
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="row my-2">
                <div className="col">
                  <input
                    className={
                      'form-control' + (formError ? ' is-invalid' : '')
                    }
                    type="password"
                    placeholder="New password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={20}
                  />
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <input
                    className={
                      'form-control' + (formError ? ' is-invalid' : '')
                    }
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={20}
                  />
                  {formError ? (
                    <div className="invalid-feedback">{formError}</div>
                  ) : null}
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={closeForm}>
                    Cancel
                  </button>
                </div>
              </div>
              <div className="row my-2">
                <div className="col">
                  <input
                    type="submit"
                    className="btn btn-primary btn-sm"
                    value="Change"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {Modal}
    </>
  )
}

export default PasswordForm
