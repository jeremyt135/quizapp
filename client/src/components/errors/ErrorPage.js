import React from 'react'

import '../../styles/errorpage.scss'
import PropTypes from 'prop-types'

/**
 * Displays an error page/splash
 * @param {number} status Error status code
 */
const ErrorPage = ({ status }) => {
  let message = ''
  switch (status) {
    case 404:
      message = "That resource wasn't found."
      break
    case 401:
    case 403:
      message = 'You are not authorized to view this resource.'
      break
    case 500:
      message = 'Internal server error.'
      break
    default:
      message = ''
  }
  return (
    <div className='container error-container'>
      <div className='error-widget col'>
        <div className='row'>
          <div className='col'>
            <h1>{status}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

ErrorPage.propTypes = {
  status: PropTypes.number.isRequired
}

export default ErrorPage
