import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import PropTypes from 'prop-types'
import Spinner from '../../common/Spinner'
import QuizItem from './layout/QuizItem'

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
 *
 * @param {object} props Component props
 * @param {[string]} props.quizList Array of quiz IDs belonging to the user
 */
const QuizList = ({ quizList }) => {
  const { quizzes, loading } = quizList

  if (loading) {
    return <Spinner />
  }
  const now = moment()
  return (
    <ul className='list-group'>
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
              questionCount={quiz.questions.length}
            />
          </li>
        )
      })}
    </ul>
  )
}

QuizList.propTypes = {
  quizList: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  quizList: state.quizList
})

export default connect(mapStateToProps)(QuizList)
