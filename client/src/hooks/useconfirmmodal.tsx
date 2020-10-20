import React, { useState } from 'react'

import ConfirmModal from 'components/common/ConfirmModal'

export type ModalConfig = {
  header: string
  body: string
  confirmText: string
  onConfirm: () => void
}

type HideModalFn = () => void
type ShowModalFn = () => void

export const useConfirmModal = ({
  header,
  body,
  confirmText,
  onConfirm
}: ModalConfig): [React.ReactNode, HideModalFn, ShowModalFn] => {
  const [show, setShow] = useState(false)
  const showModal = () => setShow(true)
  const hideModal = () => setShow(false)
  const modal = (
    <ConfirmModal
      show={show}
      onCancel={hideModal}
      onConfirm={() => {
        hideModal()
        onConfirm()
      }}
      header={header}
      body={body}
      confirmText={confirmText}
    />
  )

  return [modal, hideModal, showModal]
}
