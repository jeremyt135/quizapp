import React, { useState } from 'react'
import Answer from './Answer'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import PropTypes from 'prop-types'

/**
 * Displays one Question from a quiz.
 * @param {object} props
 * @param {number} props.index Index of question in quiz
 * @param {string} props.text Question text
 * @param {[{text: string}]} props.answers Question answer choices
 * @param {boolean} props.highlightMissing True if missing choices should be highlighted
 * @param {function} props.onChange Function to call when user has changed their choice
 */
const Question = ({
  index: questionIndex,
  text,
  answers,
  highlightMissing,
  onChange
}) => {
  const [answerIndex, setAnswerIndex] = useState(null)
  const selectAnswer = index => {
    setAnswerIndex(index)
    onChange(index, questionIndex)
  }
  return (
    <div className='row'>
      <div className='col'>
        <div className='row mb-2'>
          <h2 className='col mb-0'>
            {questionIndex + 1}. {text}{' '}
          </h2>
        </div>
        {highlightMissing && answerIndex === null ? (
          <div className='row mb-2'>
            <div className='col d-flex align-items-center '>
              <h5 className='text-danger mb-0'>Please select an answer. </h5>
              <Icon path={mdiAlertCircle} size={1} color='red' />
            </div>
          </div>
        ) : null}
        {answers.map((answer, index) => (
          <Answer
            key={index}
            questionIndex={questionIndex}
            index={index}
            text={answer.text}
            selected={answerIndex !== null && answerIndex === index}
            onChecked={() => selectAnswer(index)}
          />
        ))}
      </div>
    </div>
  )
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  highlightMissing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Question
