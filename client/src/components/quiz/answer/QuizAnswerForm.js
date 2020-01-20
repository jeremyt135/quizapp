import React, { useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import QuestionList from './QuestionList'
import Footer from '../common/Footer'

import {
  getQuizForm,
  clearQuiz,
  postQuizAnswers
} from '../../../actions/quiz/quiz'

import '../../../styles/quiz.css'
import Spinner from '../../common/Spinner'

const QuizAnswerForm = ({
  quiz,
  loading,
  getQuiz,
  clearQuiz,
  postQuizAnswers
}) => {
  const browserHistory = useHistory()
  const { id: quizId } = useParams()

  useEffect(() => {
    console.log('getquiz')
    getQuiz(quizId)
    return clearQuiz
  }, [])

  const answers = useRef(null)
  useEffect(() => {
    if (!loading) {
      answers.current = Array.from({ length: quiz.questions.length }, () => {
        return { choice: 0 }
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

  return loading ? (
    <Spinner />
  ) : (
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
          <QuestionList questions={quiz.questions} onChange={changeAnswer} />
        </div>
      </div>
      <Footer
        text={'Submit'}
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
  postQuizAnswers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  quiz: state.quiz.quiz,
  loading: state.quiz.loading
})

export default connect(mapStateToProps, {
  getQuiz: getQuizForm,
  clearQuiz,
  postQuizAnswers
})(QuizAnswerForm)
