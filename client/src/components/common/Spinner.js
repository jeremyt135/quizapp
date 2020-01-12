import React from 'react'
import '../../styles/spinner.css'

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
