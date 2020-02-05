import React, { useState } from 'react'

import ConfirmModal from '../../common/ConfirmModal'
import PropTypes from 'prop-types'

/**
 * Button HOC that renders a button but intercepts the confirm action to first display a confirmation modal.
 * @param {object} Button button component to wrap
 * @param {object} modalConfig
 * @param {string} modalConfig.header Text of modal header
 * @param {string} modalConfig.body Text of modal body
 * @param {string} modalConfig.confirm Text of modal confirm button
 */
const withConfirmModal = (Button, { header, body, confirm }) => {
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

export default withConfirmModal
