import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getQuiz, clearQuiz } from '../../actions/quiz'
import QuizAnswerForm from './answer/QuizAnswerForm'
import QuizResultList from './result/QuizResultList'
import Spinner from '../common/Spinner'
import ErrorPage from '../errors/ErrorPage'

/**
 * Handles redirection to a Quiz answer form or the results page depending
 * on the logged in user
 */
const QuizDashboard = ({ user, quiz, error, loading, getQuiz, clearQuiz }) => {
  const { id: quizId } = useParams()
  // Load the quiz from the route params on mount
  useEffect(() => {
    getQuiz(quizId)
    return clearQuiz
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (error && error.status !== 400) {
    return <ErrorPage status={error.status} />
  }

  if (quiz.user === user) {
    return <QuizResultList />
  } else {
    return <QuizAnswerForm />
  }
}

QuizDashboard.propTypes = {
  user: PropTypes.string.isRequired,
  quiz: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  user: state.user.user.username,
  quiz: state.quiz.quiz,
  error: state.quiz.error,
  loading: state.quiz.loading
})

export default connect(mapStateToProps, { getQuiz, clearQuiz })(QuizDashboard)
