import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays one answer for a question.
 * @param {object} props
 * @param {number} props.questionIndex Index of the question this answer belongs to
 * @param {number} props.index Answer index
 * @param {string} props.text Answer text
 * @param {boolean} props.selected True if this answer is selected
 * @param {function} props.onChecked Function to call when answer is clicked (checked)
 */
const Answer = ({ questionIndex, index, text, selected, onChecked }) => {
  const question = `question${questionIndex}`
  const answer = `${question}answer${index}`
  return (
    <div className='row mb-2 px-3'>
      <div className='col'>
        <div
          className={
            'form-check mb-0 pt-1 answer' +
            (selected ? ' answer--selected' : '')
          }>
          <input
            className='form-check-input'
            type='radio'
            name={question}
            id={answer}
            value={index}
            onChange={onChecked}
            checked={selected}
          />
          <label htmlFor={answer} className='answer__text'>
            {index + 1}. {text}
          </label>
        </div>
      </div>
    </div>
  )
}

Answer.propTypes = {
  questionIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired
}

export default Answer
