import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays the short info listing for a Quiz
 * @param {object} props Component props
 * @param {string} props.title Title of the quiz
 * @param {string} props.timestamp Timestamp showing how old quiz is
 * @param {number} props.questionCount Number of questions in quiz
 */
const QuizItem = ({ title, timestamp, questionCount }) => {
  return (
    <>
      <div className='d-flex w-100 justify-content-between mb-1'>
        <h5 className='mb-1'>{title}</h5>
        <small className='text-muted'>{timestamp}</small>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-1'>
            {questionCount} Question {questionCount > 1 ? 's' : ''}
          </p>
        </div>
        <div className='col d-flex justify-content-end align-items-end'>
          <a href='#' className='btn btn-primary btn-sm' role='button'>
            View Results
          </a>
        </div>
      </div>
    </>
  )
}

QuizItem.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  questionCount: PropTypes.number.isRequired
}

export default QuizItem
