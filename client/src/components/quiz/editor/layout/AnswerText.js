import React from 'react'
import PropTypes from 'prop-types'

const AnswerText = ({ text, placeholder, onChange }) => {
  return (
    <div className='row mb-1'>
      <div className='col'>
        <input
          type='text'
          className='form-control form-control-sm'
          onChange={onChange}
          value={text}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

AnswerText.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AnswerText
