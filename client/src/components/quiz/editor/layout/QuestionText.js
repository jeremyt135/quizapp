import React from 'react'
import PropTypes from 'prop-types'

const QuestionText = ({ text, id, placeholder, onChange }) => {
  return (
    <div className='row mb-2'>
      <div className='col d-flex align-items-center'>
        <input
          type='text'
          className='form-control'
          id={id}
          onChange={onChange}
          value={text}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

QuestionText.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default QuestionText
