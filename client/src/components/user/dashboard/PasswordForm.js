import React from 'react'
import PropTypes from 'prop-types'

import { useFormData } from '../../util/useFormData'

/**
 * Displays and controls a form for the user to change their password.
 */
const PasswordForm = ({ isOpen, submitChanges, closeForm }) => {
  if (!isOpen) {
    return null
  }

  const [formData, handleChange] = useFormData({
    password: '',
    confirmPassword: ''
  })

  const { password, confirmPassword } = formData

  const onSubmit = e => {
    e.preventDefault()
    if (password !== '' && password === confirmPassword) {
      submitChanges({ password })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='col'>
          <div className='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
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
                className=' form-control'
                type='password'
                placeholder='Confirm new password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
              />
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
                className='btn btn-danger btn-sm'
                value='Confirm'
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

PasswordForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  submitChanges: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
}

export default PasswordForm
