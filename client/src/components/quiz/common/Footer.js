import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays a footer with a single action button (likely for saving answers or submitting a quiz)
 * @param {object} props Component props
 * @param {string} props.text Text to display on the button
 * @param {function} props.onClick Function to invoke when clicked
 */
const Footer = ({ text, onClick }) => {
  return (
    <footer className='footer bg-light'>
      <div className='container h-100'>
        <div className='col-lg-8 col-sm-10 mx-auto h-100 d-flex align-items-center'>
          <button className='btn btn-success ml-auto' onClick={onClick}>
            {text}
          </button>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Footer
