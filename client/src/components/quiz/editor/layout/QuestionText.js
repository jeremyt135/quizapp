import React, { useState } from 'react'
import PropTypes from 'prop-types'

const QuestionText = ({ placeholder, onBlur }) => {
  const [value, setValue] = useState('')

  return (
    <div className='row mb-2'>
      <div className='col d-flex align-items-center'>
        <input
          type='text'
          className='form-control'
          onChange={e => setValue(e.target.value)}
          onBlur={() => onBlur(value)}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

QuestionText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired
}

export default QuestionText
