import React from 'react'
import PropTypes from 'prop-types'

const QuestionText = ({ text, id, placeholder, onChange }) => {
  const isValid = text.length !== 0
  return (
    <div className='row mb-2'>
      <div className='col'>
        <input
          type='text'
          className={'form-control' + (!isValid ? ' is-invalid' : '')}
          id={id}
          onChange={onChange}
          value={text}
          placeholder={placeholder}
          minLength={1}
        />
        {!isValid ? (
          <div className='invalid-feedback'>
            Please enter at least one character.
          </div>
        ) : null}
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
