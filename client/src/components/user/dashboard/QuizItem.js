import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteQuiz, goToQuizEditor } from '../../../actions/quiz/quiz'
import moment from 'moment'
import PropTypes from 'prop-types'

/**
 * Calculates the difference in days, months, years of two times
 * @param {moment} now
 * @param {moment} then
 * @returns {{ days: number, months: number, years: number }}
 */
const calculateTimeDifference = (now, then) => {
  const diff = moment.duration(now.diff(then))
  return { days: diff.days(), months: diff.months(), years: diff.years() }
}

/**
 * Determines if quiz is expired based on expiration date
 * @param {moment} expiration
 * @returns {bool} true if the expiration is on a day or time before today
 */
const checkIfQuizExpired = expiration => {
  return expiration.diff(moment()) < 0
}

/**
 * Returns a string timestamp
 * @param {object} time Time object
 * @param {number} time.days
 * @param {number} time.months
 * @param {number} time.years
 */
const createTimestamp = ({ days, months, years }) => {
  if (years > 0) {
    return `${years} years ago`
  }
  if (months > 0) {
    return `${months} months ago`
  }
  if (days > 0) {
    return `${days} days ago`
  }
  return 'Today'
}

/**
 * Displays the short info listing for a Quiz
 * @param {object} props Component props
 * @param {object} props.quiz Quiz object
 * @param {string} props.quiz.id Id of the quiz
 * @param {string} props.quiz.title Title of the quiz
 * @param {string} props.quiz.expiresIn Expiration date of quiz
 * @param {number} props.quiz.resultCount Number of results
 * @param {number} props.quiz.questionCount Number of questions
 * @param {function} props.goToQuizEditor Action creator function to edit quiz
 * @param {function} props.deleteQuiz Action creator function to delete quiz
 */
const QuizItem = ({
  quiz: { _id: id, title, expiresIn, questionCount, resultCount },
  deleteQuiz,
  goToQuizEditor
}) => {
  const browserHistory = useHistory()

  const [isExpired, setIsExpired] = useState(false)
  const [timestamp, setTimestamp] = useState('')
  useEffect(() => {
    // calculate if expired
    const now = moment()
    const expiration = moment(expiresIn)
    setTimestamp(createTimestamp(calculateTimeDifference(now, expiration)))
    setIsExpired(checkIfQuizExpired(expiration))
  }, [])

  return (
    <>
      <div className='row mb-1 align-items-center'>
        <div className='col d-flex align-items-center justify-content-start'>
          <h4 className='mb-0'>{title}</h4>
        </div>
        <div className='col d-flex align-items-center justify-content-end'>
          <button
            className='btn btn-danger btn-sm ml-1'
            type='button'
            onClick={() => deleteQuiz(id)}>
            Delete
          </button>
          <button
            className='btn btn-info btn-sm ml-1'
            type='button'
            onClick={() => goToQuizEditor(id, browserHistory)}>
            Edit
          </button>
          <button className='btn btn-primary btn-sm ml-1' type='button'>
            Results
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-1'>
            {questionCount} {questionCount === 1 ? 'Question' : 'Questions'}
          </p>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-1'>
            {resultCount} {resultCount === 1 ? 'Response' : 'Responses'}
          </p>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <p className='mb-1'>Link: quizzes/{id}</p>
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
  quiz: PropTypes.object.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  goToQuizEditor: PropTypes.func.isRequired
}

export default connect(null, { deleteQuiz, goToQuizEditor })(QuizItem)
