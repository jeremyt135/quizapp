import DeleteButton from './DeleteButton'
import withConfirmModal from './withmodal'

const modalConfig = {
  header: 'Confirm Account Deletion',
  body:
    'Are you sure you want to delete your account? This action is irreversible!',
  confirm: 'Yes, delete my account.'
}

export default withConfirmModal(DeleteButton, modalConfig)
