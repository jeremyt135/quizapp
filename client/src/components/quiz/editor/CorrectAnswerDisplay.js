import React from 'react'
import PropTypes from 'prop-types'

const CorrectAnswerDisplay = ({ number }) => {
  return (
    <>
      <div className='row mb-0'>
        <div className='col'>
          <h6 className='px-2 mb-0'>Correct Answer: {number}</h6>
        </div>
      </div>

      <div className='row mb-2'>
        <div className='col'>
          <small className='px-2 text-muted'>
            Click an answer's radio box to change the correct answer
          </small>
        </div>
      </div>
    </>
  )
}

CorrectAnswerDisplay.propTypes = {
  number: PropTypes.number.isRequired
}

export default CorrectAnswerDisplay
