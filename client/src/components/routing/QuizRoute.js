import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getQuiz, clearQuiz } from '../../actions/quiz'
import QuizAnswerForm from '../quiz/answer/QuizAnswerForm'
import QuizResultList from '../quiz/result/QuizResultList'
import Spinner from '../common/Spinner'
import ErrorPage from '../errors/ErrorPage'

/**
 * Handles redirection to a Quiz answer form or the results page depending
 * on the logged in user
 */
const QuizRoute = ({
  user,
  quiz,
  error,
  loading,
  getQuiz,
  clearQuiz,
  ...rest
}) => {
  // Extract
  const {
    computedMatch: {
      params: { id: quizId }
    }
  } = rest
  // Load the quiz from the route params on mount
  useEffect(() => {
    getQuiz(quizId)
    return clearQuiz
  }, [])

  const render = () => {
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

  return <Route {...rest} render={render} />
}

QuizRoute.propTypes = {
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

export default connect(mapStateToProps, { getQuiz, clearQuiz })(QuizRoute)
