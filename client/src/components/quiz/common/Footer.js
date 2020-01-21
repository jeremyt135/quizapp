import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a footer with a single action button (likely for saving answers or submitting a quiz)
 * @param {object} props Component props
 * @param {string} props.confirmText Text for confirm button
 * @param {string} props.cancelText Text for cancel button
 * @param {function} props.onCancel Function to invoke when cancel button is clicked
 * @param {function} props.onConfirm Function to invoke when confirm button is clicked
 */
const Footer = ({ confirmText, cancelText, onCancel, onConfirm }) => {
  return (
    <footer className='footer bg-light'>
      <div className='container h-100'>
        <div className='col-md-8 mx-auto h-100 d-flex align-items-center justify-content-end'>
          <button className='btn btn-secondary ml-1' onClick={onCancel}>
            {cancelText}
          </button>
          <button className='btn btn-success ml-1' onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default Footer
