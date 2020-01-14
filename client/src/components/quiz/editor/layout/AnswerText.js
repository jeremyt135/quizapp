import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AnswerText = ({ placeholder, onBlur }) => {
  const [value, setValue] = useState('')

  return (
    <div className='row mb-1'>
      <div className='col'>
        <input
          type='text'
          className='form-control form-control-sm'
          onChange={e => setValue(e.target.value)}
          onBlur={() => onBlur(value)}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

AnswerText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired
}

export default AnswerText
