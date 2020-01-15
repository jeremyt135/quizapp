import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'

import PropTypes from 'prop-types'
import Spinner from '../../common/Spinner'
import QuizItem from './layout/QuizItem'

import { deleteQuiz } from '../../../actions/quiz/quiz'
import { getQuizList, clearQuizList } from '../../../actions/quiz/quizlist'

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
 * Redirects user to quiz page in edit mode
 * @param {object} quiz quiz to use in page
 */

/**
 *
 * @param {object} props Component props
 * @param {[string]} props.quizList quizList state
 * @param {[string]} props.quizIds array of quiz IDs belonging to user
 * @param {deleteQuiz} props.deleteQuiz Callback to delete a quiz
 */
const QuizList = ({
  quizIds,
  quizList,
  deleteQuiz,
  getQuizList,
  clearQuizList
}) => {
  const { quizzes, loading } = quizList

  const now = moment()

  const browserHistory = useHistory()

  const goToQuizEditor = quiz => {
    browserHistory.push(`/quiz/${quiz._id}/edit`, { quiz, editing: true })
  }

  useEffect(() => {
    // load the quiz list once on load to ensure it's there
    getQuizList(quizIds)
    return clearQuizList
  }, [quizIds])

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
          {loading ? (
            <Spinner />
          ) : (
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
                      questionCount={quiz.questions.length}
                      onDelete={() => deleteQuiz(quiz)}
                      onEdit={() => goToQuizEditor(quiz)}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

QuizList.propTypes = {
  quizList: PropTypes.object.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  clearQuizList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  quizList: state.quizList
})

export default connect(mapStateToProps, {
  deleteQuiz,
  getQuizList,
  clearQuizList
})(QuizList)
