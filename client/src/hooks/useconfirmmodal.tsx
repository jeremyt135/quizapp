import React, { useState } from 'react'

import ConfirmModal, { ConfirmModalProps } from 'components/common/ConfirmModal'

type HideModalFn = () => void
type ShowModalFn = () => void

export const useConfirmModal = ({
  header,
  body,
  cancelText,
  confirmText,
  onCancel,
  onConfirm
}: Partial<ConfirmModalProps>): [React.ReactNode, HideModalFn, ShowModalFn] => {
  const [show, setShow] = useState(false)
  const showModal = () => setShow(true)
  const hideModal = () => setShow(false)
  const modal = (
    <ConfirmModal
      show={show}
      onCancel={() => {
        hideModal()
        if (onCancel) {
          onCancel()
        }
      }}
      onConfirm={() => {
        hideModal()
        if (onConfirm) {
          confirm()
        }
      }}
      header={header ?? 'Confirm Action'}
      body={body ?? 'Are you sure you want to perform this action?'}
      cancelText={cancelText ?? 'Cancel'}
      confirmText={confirmText ?? 'Confirm'}
    />
  )

  return [modal, hideModal, showModal]
}

export type { ConfirmModalProps } from 'components/common/ConfirmModal'
