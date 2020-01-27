import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { deleteUser } from '../../../actions/user'
import ConfirmModal from '../../common/ConfirmModal'

const DeleteButton = ({ deleteUser }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const handleClose = () => {
    setModalIsOpen(false)
  }
  const handleConfirm = () => {
    setModalIsOpen(false)
    deleteUser()
  }
  const showModal = () => {
    setModalIsOpen(true)
  }
  return (
    <>
      <div className='row my-2'>
        <div className='col'>
          <button className='btn btn-danger btn-sm' onClick={showModal}>
            Delete Account
          </button>
        </div>
      </div>
      <ConfirmModal
        show={modalIsOpen}
        onCancel={handleClose}
        onConfirm={handleConfirm}
        header='Confirm Account Deletion'
        body='Are you sure you want to delete your account? This action is irreversible!'
        confirmText={'Yes, delete my account.'}
      />
    </>
  )
}

DeleteButton.propTypes = {
  deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(DeleteButton)
