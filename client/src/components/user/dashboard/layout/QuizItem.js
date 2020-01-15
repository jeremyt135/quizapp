import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays the short info listing for a Quiz
 * @param {object} props Component props
 * @param {string} props.title Title of the quiz
 * @param {string} props.timestamp Timestamp showing how old quiz is
 * @param {boolean} props.isExpired Value indicating if quiz has expired
 * @param {number} props.questionCount Number of questions in quiz
 */
const QuizItem = ({ title, timestamp, isExpired, questionCount }) => {
  return (
    <>
      <div className='row mb-1 align-items-center'>
        <div className='col d-flex align-items-center justify-content-start'>
          <h4 className='mb-0'>{title}</h4>
        </div>
        <div className='col d-flex align-items-center justify-content-end'>
          <a href='#' className='btn btn-primary btn-sm' role='button'>
            View Results
          </a>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-1'>
            {questionCount} Question {questionCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <div className='row'>
        <small className='col text-muted text-left'>Created {timestamp}</small>
        {isExpired ? (
          <small className='col text-danger text-right'>Expired</small>
        ) : null}
      </div>
    </>
  )
}

QuizItem.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  isExpired: PropTypes.bool.isRequired,
  questionCount: PropTypes.number.isRequired
}

export default QuizItem
