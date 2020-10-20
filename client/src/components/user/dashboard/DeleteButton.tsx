import React from 'react'
import { Button } from 'react-bootstrap'

import { useConfirmModal, ConfirmModalProps } from 'hooks/useconfirmmodal'

type Props = {
  text: string
  onClick: () => void
  confirm?: boolean
  modalConfig?: Partial<ConfirmModalProps>
}

/**
 * A button for performing a delete action. If `confirm` is true, renders
 * a `ConfirmModal` to handle confirming the action.
 */
const DeleteButton = ({ text, onClick, confirm, modalConfig }: Props) => {
  const [Modal, , showModal] = useConfirmModal(
    modalConfig ?? {
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
