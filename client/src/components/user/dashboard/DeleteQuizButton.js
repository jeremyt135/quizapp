import DeleteButton from './DeleteButton'
import withModal from './withmodal'

const modalConfig = {
  header: 'Confirm Quiz Deletion',
  body:
    'Are you sure you want to delete this quiz? This action is irreversible!',
  confirm: 'Yes, delete this quiz.'
}

export default withModal(DeleteButton, modalConfig)
