import React, { useState } from 'react'

import ConfirmModal from '../../common/ConfirmModal'
import PropTypes from 'prop-types'

const withModal = (Button, { header, body, confirm }) => {
  const ButtonWithModal = ({ text, onClick }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleClose = () => {
      setModalIsOpen(false)
    }
    const handleConfirm = () => {
      setModalIsOpen(false)
      onClick()
    }
    const showModal = () => {
      setModalIsOpen(true)
    }
    return (
      <>
        <Button text={text} onClick={showModal} />
        <ConfirmModal
          show={modalIsOpen}
          onCancel={handleClose}
          onConfirm={handleConfirm}
          header={header}
          body={body}
          confirmText={confirm}
        />
      </>
    )
  }
  ButtonWithModal.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }
  return ButtonWithModal
}

export default withModal
