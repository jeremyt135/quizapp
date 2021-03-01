import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export type ConfirmModalProps = {
  /**
   * Text content of the header of the modal
   */
  header: string
  /**
   * Text content of the body of the modal
   */
  body: string
  /**
   * Function to call when user cancels action
   */
  onCancel: () => void
  /**
   * Function to call when user confirms action
   */
  onConfirm: () => void
  /**
   * Text of cancel button
   */
  cancelText?: string
  /**
   * Text of confirm button
   */
  confirmText?: string
  /**
   * True if modal should appear on screen
   */
  show: boolean
}

/**
 * Displays a modal for the user to confirm or cancel an action
 */
const ConfirmModal = ({
  header,
  body,
  show,
  onCancel,
  onConfirm,
  cancelText,
  confirmText
}: ConfirmModalProps) => {
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

export default ConfirmModal
