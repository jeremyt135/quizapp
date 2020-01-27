import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ConfirmModal from '../../common/ConfirmModal'
import { changeUserEmail } from '../../../actions/user'
/**
 * Displays and controls a form for the user to change their email.
 */
const EmailForm = ({ initialEmail, changeUserEmail }) => {
  const [email, setEmail] = useState(initialEmail)

  const [formError, setFormError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleChange = e => {
    setFormError('')
    setEmail(e.target.value)
  }

  const closeForm = () => {
    setIsOpen(false)
    setFormError(null)
    setEmail(initialEmail)
  }

  const openForm = () => {
    setFormError(null)
    setIsOpen(true)
  }

  const showModal = e => {
    e.preventDefault()
    if (email !== initialEmail) {
      setModalIsOpen(true)
    } else {
      setFormError('You are already using this email.')
    }
  }
  const handleClose = () => {
    setModalIsOpen(false)
    closeForm()
  }

  const handleFailure = error => {
    if (error) {
      if (error.status === 409) {
        setFormError('Email already in use.')
      } else {
        setFormError('Cannot change email at this time.')
      }
    } else {
      closeForm()
    }
  }

  const handleSubmit = () => {
    changeUserEmail(email, handleFailure)
    setModalIsOpen(false)
  }

  return (
    <>
      {!isOpen ? (
        <div className='row my-2'>
          <div className='col'>
            <button className='btn btn-info btn-sm' onClick={openForm}>
              Change Email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={showModal}>
          <div className='row my-2'>
            <div className='col'>
              <input
                className={'form-control' + (formError ? ' is-invalid' : '')}
                type='email'
                placeholder='New email'
                name='email'
                value={email}
                onChange={handleChange}
                required
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
                value='Confirm'
              />
            </div>
          </div>
        </form>
      )}

      <ConfirmModal
        show={modalIsOpen}
        onCancel={handleClose}
        onConfirm={handleSubmit}
        header='Confirm Changes'
        body='Are you sure you want to change email?'
      />
    </>
  )
}

EmailForm.propTypes = {
  initialEmail: PropTypes.string.isRequired,
  changeUserEmail: PropTypes.func.isRequired
}

export default connect(null, { changeUserEmail })(EmailForm)
