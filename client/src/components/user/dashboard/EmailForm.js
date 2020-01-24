import React from 'react'
import PropTypes from 'prop-types'

import { useFormData } from '../../util/useFormData'

/**
 * Displays and controls a form for the user to change their email.
 */
const EmailForm = ({ initialEmail, submitChanges, closeForm }) => {
  const [formData, handleChange] = useFormData({
    email: ''
  })

  const { email } = formData

  const onSubmit = e => {
    e.preventDefault()
    if (email !== '' && email !== initialEmail) {
      submitChanges({ email })
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
                type='email'
                placeholder='New email'
                name='email'
                value={email}
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

EmailForm.propTypes = {
  initialEmail: PropTypes.string.isRequired,
  submitChanges: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
}

export default EmailForm
