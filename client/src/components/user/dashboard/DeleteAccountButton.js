import DeleteButton from './DeleteButton'
import withModal from './withmodal'

const modalConfig = {
  header: 'Confirm Account Deletion',
  body:
    'Are you sure you want to delete your account? This action is irreversible!',
  confirm: 'Yes, delete my account.'
}

export default withModal(DeleteButton, modalConfig)
