import React from 'react'
import { Button } from 'react-bootstrap'

import { useConfirmModal, ModalConfig } from 'hooks/useconfirmmodal'

type Props = {
  text: string
  onClick: () => void
  confirm?: boolean
  modalConfig?: ModalConfig
}

/**
 * A button for performing a delete action. If `confirm` is true, renders
 * a `ConfirmModal` to handle confirming the action.
 */
const DeleteButton = ({ text, onClick, confirm, modalConfig }: Props) => {
  const [Modal, , showModal] = useConfirmModal(
    modalConfig ?? {
      header: 'Confirm Action',
      body: 'Are you sure you want to perform this action?',
      confirmText: 'Yes',
      onConfirm: onClick
    }
  )
  return (
    <>
      <Button variant="danger" size="sm" onClick={showModal}>
        {text}
      </Button>
      {confirm && Modal}
    </>
  )
}

export default DeleteButton
