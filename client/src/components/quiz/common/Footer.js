import React from 'react'

/**
 * Displays a footer with children placed starting from the right end of the footer bar.
 * @param {object} props Component props
 * @param {any} props.children Child elements
 */
const Footer = ({ children }) => {
  return (
    <footer className='footer'>
      <div className='container-fluid h-100'>
        <div className='col-sm-8 mx-auto h-100 d-flex align-items-center justify-content-end'>
          {children}
        </div>
      </div>
    </footer>
  )
}

export default Footer
