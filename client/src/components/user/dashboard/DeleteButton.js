import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

/**
 * Renders a small red button
 * @param {object} props
 * @param {string} props.text TExt to display on the button
 * @param {function} props.onClick Function to call on button click
 */
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
