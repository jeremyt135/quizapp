import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AnswerText from './layout/AnswerText'

/**
 * Callback for changing Answer data in the parent Question
 *
 * @callback onChange
 * @param {{text: string, correctAnswer: number, answers: Array}} question Question data
 */

/**
 * Callback for removing an answer
 * @callback remove
 * @param {number} answerIndex
 */

/**
 * Displays an answer with button to remove itself
 * @param {object} props Component props
 * @param {number} props.index Index of this answer
 * @param {text: string} props.defaultValue Default Answer data
 * @param {string} props.questionName The name of the parent question
 * @param {onChange} props.onChange function to invoke when Answer data changes
 * @param {remove} props.remove function to invoke when Answer should be removed
 * @param {bool} props.correct represents whether this answer should be considered correct
 */
const Answer = ({
  index,
  defaultValue,
  questionName,
  onChange,
  onChecked,
  remove,
  correct
}) => {
  const id = `${questionName}answer${index}`

  const [text, setText] = useState(defaultValue)

  const changeText = e => {
    setText(e.target.value)
    onChange({ text: e.target.value }, index)
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
                id={id}
                value='1'
                onChange={() => onChecked(index)}
                checked={correct}
              />
              <label htmlFor={id}>{index + 1}.</label>
            </div>
            <button
              className='btn btn-danger btn-sm ml-auto'
              onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        </div>
        <AnswerText
          text={text}
          placeholder={`Answer ${index + 1} text...`}
          onChange={changeText}
        />
      </div>
    </>
  )
}

Answer.propTypes = {
  index: PropTypes.number.isRequired,
  defaultValue: PropTypes.string.isRequired,
  questionName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  correct: PropTypes.bool.isRequired
}

export default Answer
