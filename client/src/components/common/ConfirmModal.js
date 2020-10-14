import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

/**
 * Displays a modal for the user to confirm or cancel an action
 * @param {object} props
 * @param {string} props.header Text content of the header of the modal
 * @param {string} props.body Text content of the body of the modal
 * @param {function} props.onCancel Function to call when user cancels action
 * @param {function} props.onConfirm Function to call when user confirms action
 * @param {string} props.cancelText Text of cancel button
 * @param {string} props.confirmText Text of confirm button
 */
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
    <div data-testid="confirm-modal">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {cancelText || 'Cancel'}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
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
