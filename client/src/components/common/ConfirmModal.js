import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ConfirmModal = ({
  header,
  body,
  show,
  onCancel,
  onConfirm,
  cancelText,
  confirmText
}) => {
  const handleClose = () => {
    onCancel()
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            {cancelText || 'Cancel'}
          </Button>
          <Button variant='danger' onClick={onConfirm}>
            {confirmText || 'Confirm Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

ConfirmModal.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string
}

export default ConfirmModal
