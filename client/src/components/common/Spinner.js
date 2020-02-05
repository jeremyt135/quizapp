import React from 'react'
import '../../styles/spinner.scss'

/**
 * Displays a spinner icon for use when an object is loading
 */
const Spinner = () => {
  return (
    <div className='container-fluid spinner-container'>
      <div className='spinner spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
