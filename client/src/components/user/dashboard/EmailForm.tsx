import React, { useCallback, useState } from 'react'

import { useConfirmModal } from 'hooks/useconfirmmodal'
import { ApiError } from 'api'

type Props = {
  defaultValue: string
  changeEmail: (email: string) => Promise<ApiError | undefined>
}

/**
 * Displays and controls a form for the user to change their email.
 */
const EmailForm = ({ defaultValue, changeEmail }: Props) => {
  const [email, setEmail] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const closeForm = () => {
    setEmail(defaultValue)
    setIsOpen(false)
    setFormError(null)
  }

  const openForm = () => {
    setFormError(null)
    setIsOpen(true)
  }

  const onConfirm = useCallback(() => {
    changeEmail(email).then(apiError => {
      if (apiError) {
        if (apiError.status === 409) {
          setFormError('Email already in use.')
        } else {
          setFormError('Cannot change email at this time.')
        }
      } else {
        closeForm()
      }
    })
  }, [email])

  const [Modal, , showModal] = useConfirmModal({
    header: 'Confirm Changes',
    body: 'Are you sure you want to change email?',
    onConfirm: onConfirm
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError('')
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email !== defaultValue) {
      showModal()
    } else {
      setFormError('You are already using this email.')
    }
  }

  return (
    <>
      {!isOpen ? (
        <div className="row my-2">
          <div className="col">
            <button className="btn btn-info btn-sm" onClick={openForm}>
              Change Email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row my-2">
            <div className="col">
              <input
                className={'form-control' + (formError ? ' is-invalid' : '')}
                type="email"
                placeholder="New email"
                name="email"
                value={email}
                onChange={handleChange}
                required
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
        </form>
      )}
      {Modal}
    </>
  )
}

export default EmailForm
