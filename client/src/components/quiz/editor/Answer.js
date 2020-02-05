import React from 'react'
import PropTypes from 'prop-types'

import AnswerText from './AnswerText'

/**
 * Displays an answer with button to remove itself
 * @param {object} props Component props
 * @param {number} props.index Index of this answer
 * @param {string} props.defaultText Default Answer data
 * @param {string} props.questionName The name of the parent question
 * @param {function} props.handleTextChange function to invoke when Answer text changes
 * @param {function} props.handleChecked function to invoke when checked Answer changes
 * @param {function} props.removeAnswer function to invoke when Answer should be removed
 * @param {boolean} props.correct represents whether this answer should be considered correct
 * @param {boolean} props.disabled True if checkboxes can be pressed to change correct answer
 */
const Answer = ({
  index,
  defaultText,
  questionName,
  handleTextChange,
  handleChecked,
  removeAnswer,
  correct,
  disabled
}) => {
  const id = `${questionName}answer${index}`

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
                id={id}
                value='1'
                onChange={() => handleChecked(index)}
                checked={correct}
                disabled={disabled}
              />
              <label htmlFor={id}>{index + 1}.</label>
            </div>
            <button
              className='btn btn-danger btn-sm ml-auto'
              onClick={removeAnswer}
              disabled={disabled}>
              Delete
            </button>
          </div>
        </div>
        <AnswerText
          defaultValue={defaultText}
          placeholder={`Answer ${index + 1} text...`}
          onBlur={text => handleTextChange(index, text)}
        />
      </div>
    </>
  )
}

Answer.propTypes = {
  index: PropTypes.number.isRequired,
  defaultText: PropTypes.string.isRequired,
  questionName: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  removeAnswer: PropTypes.func.isRequired,
  correct: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default Answer
