import React from 'react'
import PropTypes from 'prop-types'

const AnswerText = ({ text, placeholder, onChange }) => {
  const isValid = text.length !== 0
  return (
    <div className='row mb-1'>
      <div className='col'>
        <input
          type='text'
          className={
            'form-control form-control-sm' + (!isValid ? ' is-invalid' : '')
          }
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

AnswerText.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AnswerText
