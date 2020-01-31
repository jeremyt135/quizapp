import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const DeleteButton = ({ text, onClick }) => {
  return (
    <Button variant='danger' size='sm' onClick={onClick}>
      {text}
    </Button>
  )
}

DeleteButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DeleteButton
