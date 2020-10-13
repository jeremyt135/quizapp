import React, { useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import QuestionList from './QuestionList'
import Footer from '../common/Footer'
import Spinner from '../../common/Spinner'
import ErrorPage from '../../errors/ErrorPage'

import { getQuiz, clearQuiz, postQuizAnswers } from '../../../store/quiz/thunks'
import { getResult, clearResult } from '../../../store/result/thunks'

import QuizTakenError from './QuizTakenError'
import QuizExpiredError from './QuizExpiredError'

/**
 * Displays a form for a user to take/answer a quiz.
 * @param {object} props
 * @param {string} props.user Id of logged in user
 * @param {object} props.result Result state from redux (used to determine if user has answered quiz)
 * @param {{
 *   questions: [{ text: string }],
 *   expiration: string,
 *   title: string, }} props.quiz Quiz data from redux (for displaying what the user has to answer)
 * @param {boolean} props.loading True if Quiz data is loading
 * @param {{ status: number, errors: [any]}} props.error Quiz redux error state
 * @param {function} props.getQuiz Action creator to load a quiz by id
 * @param {function} props.clearQuiz Action creator to clear quiz data
 * @param {function} props.postQuizAnswers Action creator to post the quiz answers
 * @param {function} props.getResult Action creator to get a user's result for a quiz
 */
const QuizAnswerForm = ({
  user,
  result,
  quiz,
  loading,
  error,
  getQuiz,
  clearQuiz,
  clearResult,
  postQuizAnswers,
  getResult
}) => {
  const browserHistory = useHistory()
  const { id: quizId } = useParams()

  // Load the quiz from the route params on mount
  useEffect(() => {
    getQuiz(quizId)
    getResult(quizId, user)
    return () => {
      clearQuiz()
      clearResult()
    }
  }, [])

  const answers = useRef(null)
  useEffect(() => {
    if (!loading && !error) {
      answers.current = Array.from({ length: quiz.questions.length }, () => {
        return {}
      })
    }
  }, [loading])

  const goToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  const changeAnswer = (answerIndex, questionIndex) => {
    answers.current[questionIndex].choice = answerIndex
  }

  const submitAnswers = () => {
    postQuizAnswers(quizId, answers.current, goToDashboard)
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    const status = error.status
    if (status === 403 && error.errors.length > 0) {
      const expired = error.errors.some(e => e.hasOwnProperty('expiration'))
      if (expired) {
        return <QuizExpiredError />
      }
    } else if (status !== 400) {
      return <ErrorPage status={status} />
    }
  } else if (!result.loading && result.result) {
    return <QuizTakenError />
  } else if (moment(quiz.expiration).diff(moment()) < 0) {
    return <QuizExpiredError />
  }

  return (
    <>
      <div className="content">
        <div className="quiz-answer-form container-fluid">
          <div className="row">
            <div className="quiz-answer-form__block col-sm-8 mx-auto mt-3">
              <div className="row mb-4">
                <div className="col d-flex align-items-center">
                  <h1 className="mb-0">{quiz.title}</h1>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col d-flex align-items-center">
                  <h3>By {quiz.user}</h3>
                </div>
              </div>
              <QuestionList
                error={error}
                questions={quiz.questions}
                onChange={changeAnswer}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <Button variant="secondary" className="ml-1" onClick={goToDashboard}>
          Cancel
        </Button>
        <Button variant="success" className="ml-1" onClick={submitAnswers}>
          Submit
        </Button>
      </Footer>
    </>
  )
}

QuizAnswerForm.propTypes = {
  user: PropTypes.string.isRequired,
  result: PropTypes.object,
  quiz: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getQuiz: PropTypes.func.isRequired,
  clearQuiz: PropTypes.func.isRequired,
  postQuizAnswers: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
  getResult: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user.user._id,
  result: state.result,
  quiz: state.quiz.quiz,
  loading: state.quiz.loading,
  error: state.quiz.error
})

export default connect(mapStateToProps, {
  getQuiz,
  clearQuiz,
  postQuizAnswers,
  getResult,
  clearResult
})(QuizAnswerForm)
