import React from 'react'
import PropTypes from 'prop-types'

const CorrectAnswerDisplay = ({ number }) => {
  return (
    <div className='row mb-2'>
      <div className='col-sm-6 mr-auto'>
        <h6 className='px-2'>Correct Answer: {number}</h6>
      </div>
    </div>
  )
}

CorrectAnswerDisplay.propTypes = {
  number: PropTypes.number.isRequired
}

export default CorrectAnswerDisplay
