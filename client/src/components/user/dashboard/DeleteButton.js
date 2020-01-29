import React from 'react'
import PropTypes from 'prop-types'

const DeleteButton = ({ text, onClick }) => {
  return (
    <>
      <button className='btn btn-danger btn-sm' onClick={onClick}>
        {text}
      </button>
    </>
  )
}

DeleteButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DeleteButton
