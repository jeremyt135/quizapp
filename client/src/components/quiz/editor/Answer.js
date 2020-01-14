import React from 'react'
import PropTypes from 'prop-types'

import AnswerText from './layout/AnswerText'

/**
 * Displays an answer to a question from a quiz.
 */
const Answer = ({
  index,
  text,
  questionName,
  onChange,
  onChecked,
  remove,
  correct
}) => {
  const htmlId = `${questionName}answer${index}`

  const changeText = updatedText => {
    if (updatedText !== text) {
      onChange({ text: updatedText }, index)
    }
  }

  return (
    <>
      <div className={'answer' + (correct ? ' answer--selected' : '')}>
        <div className='row mt-2'>
          <div className='col d-flex align-items-start'>
            <div className='form-check mb-1'>
              <input
                className='form-check-input'
                type='radio'
                name={questionName}
                id={htmlId}
                value='1'
                onChange={() => onChecked(index)}
                checked={correct}
              />
              <label htmlFor={htmlId}>{index + 1}.</label>
            </div>
            <button
              className='btn btn-danger btn-sm ml-auto'
              onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        </div>
        <AnswerText
          placeholder={`Answer ${index + 1} text...`}
          onBlur={changeText}
        />
      </div>
    </>
  )
}

Answer.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  questionName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  correct: PropTypes.bool.isRequired
}

export default Answer
