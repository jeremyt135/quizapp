import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ConfirmModal = ({ header, body, show, onCancel, onConfirm }) => {
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
            Cancel
          </Button>
          <Button variant='danger' onClick={onConfirm}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConfirmModal
