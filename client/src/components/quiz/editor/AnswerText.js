import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AnswerText = ({ index, defaultValue, error, onBlur }) => {
  const [text, setText] = useState(defaultValue)
  const isValid = text.length !== 0
  const shouldDisplayWarning = error && error.status === 400 && !isValid
  const onChange = e => {
    setText(e.target.value)
  }
  return (
    <div className='row mb-1'>
      <div className='col'>
        <input
          type='text'
          className={
            'form-control form-control-sm' +
            (shouldDisplayWarning ? ' is-invalid' : '')
          }
          onChange={onChange}
          onBlur={() => onBlur(text)}
          value={text}
          placeholder={`Answer ${index + 1} text...`}
          minLength={1}
        />
        {shouldDisplayWarning ? (
          <div className='invalid-feedback'>
            Please enter at least one character.
          </div>
        ) : null}
      </div>
    </div>
  )
}

AnswerText.propTypes = {
  index: PropTypes.number.isRequired,
  defaultValue: PropTypes.string.isRequired,
  error: PropTypes.object,
  onBlur: PropTypes.func.isRequired
}

export default AnswerText
