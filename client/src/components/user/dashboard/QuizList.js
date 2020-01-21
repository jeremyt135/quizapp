import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import QuizItem from './layout/QuizItem'
import Spinner from '../../common/Spinner'

import { clearQuizList, getQuizList } from '../../../actions/user/quizlist'
import { deleteQuiz, goToQuizEditor } from '../../../actions/quiz/quiz'

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
 * @param {boolean} props.loading True if quiz list is loading
 * @param {[object]} props.quizzes List of quizzes
 * @param {function} props.deleteQuiz Function to delete a quiz
 * @param {function} props.getQuizList Function to get quiz list
 * @param {function} props.clearQuizList Function to clear quiz list
 */
const QuizList = ({
  loading,
  quizzes,
  deleteQuiz,
  getQuizList,
  clearQuizList,
  goToQuizEditor
}) => {
  const browserHistory = useHistory()

  // store current time when component is mounted
  const now = moment()

  useEffect(() => {
    getQuizList()
    return clearQuizList
  }, [])

  return (
    <>
      <div className='row mb-2 align-items-center'>
        <h3 className='col mb-0'>Quizzes You Created:</h3>
      </div>
      {quizzes.length === 0 ? (
        <div className='row mb-2 align-items-center'>
          <h6 className='col mb-0'>You haven't made any quizzes!</h6>
        </div>
      ) : null}
      <div className='row mb-1 align-items-center'>
        <div className='col'>
          <Link to='/quizzes/create' className='btn btn-success btn-sm ml-auto'>
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
                      id={quiz._id}
                      title={quiz.title}
                      timestamp={createTimestamp(
                        calculateTimeDifference(now, expiration)
                      )}
                      isExpired={checkIfQuizExpired(expiration)}
                      resultCount={quiz.resultsCount}
                      questionCount={quiz.questionCount}
                      onDelete={() => deleteQuiz(quiz)}
                      onEdit={() => goToQuizEditor(quiz._id, browserHistory)}
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
  loading: PropTypes.bool.isRequired,
  quizzes: PropTypes.array,
  deleteQuiz: PropTypes.func.isRequired,
  getQuizList: PropTypes.func.isRequired,
  clearQuizList: PropTypes.func.isRequired,
  goToQuizEditor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loading: state.quizList.loading,
  quizzes: state.quizList.quizzes
})

export default connect(mapStateToProps, {
  getQuizList,
  deleteQuiz,
  goToQuizEditor,
  clearQuizList
})(QuizList)
