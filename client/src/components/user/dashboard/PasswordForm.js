import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ConfirmModal from '../../common/ConfirmModal'
import { changeUserPassword } from '../../../actions/user'

/**
 * Displays and controls a form for the user to change their password.
 */
const PasswordForm = ({ changeUserPassword }) => {
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    confirmPassword: ''
  })

  const { password, confirmPassword } = passwordInput

  const [formError, setFormError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleChange = e => {
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }

  const closeForm = () => {
    setIsOpen(false)
    setFormError(null)
    setPasswordInput({ password: '', confirmPassword: '' })
  }

  const openForm = () => {
    setFormError(null)
    setIsOpen(true)
  }

  const showModal = e => {
    e.preventDefault()
    if (password === confirmPassword) {
      setModalIsOpen(true)
    } else {
      setFormError('Passwords do not match.')
    }
  }
  const handleClose = () => {
    setModalIsOpen(false)
    closeForm()
  }

  const handleFailure = error => {
    if (error) {
      setFormError('Cannot change password at this time.')
    } else {
      closeForm()
    }
  }

  const handleSubmit = () => {
    changeUserPassword(password, handleFailure)
    setModalIsOpen(false)
  }

  return (
    <>
      {!isOpen ? (
        <div className='row my-2'>
          <div className='col'>
            <button className='btn btn-info btn-sm' onClick={openForm}>
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={showModal}>
          <div className='row'>
            <div className='col'>
              <div className='row my-2'>
                <div className='col'>
                  <input
                    className={
                      'form-control' + (formError ? ' is-invalid' : '')
                    }
                    type='password'
                    placeholder='New password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='row my-2'>
                <div className='col'>
                  <input
                    className={
                      'form-control' + (formError ? ' is-invalid' : '')
                    }
                    type='password'
                    placeholder='Confirm new password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  {formError ? (
                    <div className='invalid-feedback'>{formError}</div>
                  ) : null}
                </div>
              </div>
              <div className='row my-2'>
                <div className='col'>
                  <button
                    type='button'
                    className='btn btn-secondary btn-sm'
                    onClick={closeForm}>
                    Cancel
                  </button>
                </div>
              </div>
              <div className='row my-2'>
                <div className='col'>
                  <input
                    type='submit'
                    className='btn btn-primary btn-sm'
                    value='Change'
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      <ConfirmModal
        show={modalIsOpen}
        onCancel={handleClose}
        onConfirm={handleSubmit}
        header='Confirm Changes'
        body='Are you sure you want to change password?'
      />
    </>
  )
}

PasswordForm.propTypes = {
  changeUserPassword: PropTypes.func.isRequired
}

export default connect(null, { changeUserPassword })(PasswordForm)
