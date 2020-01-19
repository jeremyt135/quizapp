import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

import QuizItem from './layout/QuizItem'
import Spinner from '../../common/Spinner'

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
 * Deletes a quiz by id
 * @callback deleteQuiz
 * @param {object} quiz quiz to delete
 */

/**
 *
 * @param {object} props Component props
 * @param {[object]} props.quizzes list of quizzes to show
 * @param {boolean} props.loading true if quizzes is still loading
 * @param {deleteQuiz} props.deleteQuiz Callback to delete a quiz
 * @param {function} props.editQuiz Callback to go to quiz editor with quiz
 */
const QuizList = ({ loading, quizzes, deleteQuiz, editQuiz }) => {
  if (loading) {
    return <Spinner />
  }
  // store current time when component is mounted
  const now = moment()

  return (
    <>
      <div className='row mb-1 align-items-center'>
        <h3 className='col mb-0'>Quizzes You Created:</h3>
      </div>
      <div className='row mb-1 align-items-center'>
        <div className='col'>
          <Link to='/quiz/create' className='btn btn-success btn-sm ml-auto'>
            Create A Quiz
          </Link>
        </div>
      </div>
      <div className='row mb-1'>
        <div className='col'>
          <ul className='list-group w-100'>
            {quizzes.map((quiz, index) => {
              const expiration = moment(quiz.expiresIn)
              return (
                <li key={index} className='list-group-item'>
                  <QuizItem
                    title={quiz.title}
                    timestamp={createTimestamp(
                      calculateTimeDifference(now, expiration)
                    )}
                    isExpired={checkIfQuizExpired(expiration)}
                    questionCount={quiz.questionCount}
                    onDelete={() => deleteQuiz(quiz)}
                    onEdit={() => editQuiz(quiz._id)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

QuizList.propTypes = {
  loading: PropTypes.bool.isRequired,
  quizzes: PropTypes.array.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  editQuiz: PropTypes.func.isRequired
}

export default QuizList
