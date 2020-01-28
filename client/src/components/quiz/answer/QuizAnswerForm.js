import React, { useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import QuestionList from './QuestionList'
import Footer from '../common/Footer'
import Spinner from '../../common/Spinner'
import ErrorPage from '../../errors/ErrorPage'

import { getQuiz, clearQuiz, postQuizAnswers } from '../../../actions/quiz'
import { getResult } from '../../../actions/result'

import '../../../styles/quiz.css'
import QuizTakenError from './QuizTakenError'
import QuizExpiredError from './QuizExpiredError'

const QuizAnswerForm = ({
  user,
  result,
  quiz,
  loading,
  error,
  getQuiz,
  clearQuiz,
  postQuizAnswers,
  getResult
}) => {
  const browserHistory = useHistory()
  const { id: quizId } = useParams()

  // Load the quiz from the route params on mount
  useEffect(() => {
    getQuiz(quizId)
    getResult(quizId, user)
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
      const expired = error.errors.some(e => e.hasOwnProperty('expiresIn'))
      if (expired) {
        return <QuizExpiredError />
      }
    } else if (status !== 400) {
      return <ErrorPage status={status} />
    }
  } else if (!result.loading && result.result) {
    return <QuizTakenError />
  } else if (moment(quiz.expiresIn).diff(moment()) < 0) {
    return <QuizExpiredError />
  }

  return (
    <>
      <div className='container'>
        <div className='content col-md-8 mx-auto mt-3'>
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h1 className='mb-0'>{quiz.title}</h1>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
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
      <Footer
        cancelText='Cancel'
        confirmText={'Submit'}
        onCancel={goToDashboard}
        onConfirm={submitAnswers}
      />
    </>
  )
}

QuizAnswerForm.propTypes = {
  quiz: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getQuiz: PropTypes.func.isRequired,
  clearQuiz: PropTypes.func.isRequired,
  postQuizAnswers: PropTypes.func.isRequired,
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
  getResult
})(QuizAnswerForm)
