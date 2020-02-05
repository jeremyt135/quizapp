import React, { useState } from 'react'
import PropTypes from 'prop-types'

const QuestionText = ({ index, defaultValue, error, onBlur }) => {
  const [text, setText] = useState(defaultValue)
  const isValid = text.length !== 0
  const shouldDisplayWarning = error && error.status === 400 && !isValid
  const onChange = e => {
    setText(e.target.value)
  }
  return (
    <div className='row mb-2'>
      <div className='col'>
        <input
          type='text'
          className={
            'form-control' + (shouldDisplayWarning ? ' is-invalid' : '')
          }
          id={`question${index}`}
          onChange={onChange}
          onBlur={() => onBlur(text)}
          value={text}
          placeholder={`Question ${index + 1} text...`}
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

QuestionText.propTypes = {
  index: PropTypes.number.isRequired,
  defaultValue: PropTypes.string.isRequired,
  error: PropTypes.object,
  onBlur: PropTypes.func.isRequired
}

export default QuestionText
