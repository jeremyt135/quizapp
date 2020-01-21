import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Footer from '../common/Footer'
import Spinner from '../../common/Spinner'
import ScoredQuestionList from './ScoredQuestionList'

import { getResult, clearResult } from '../../../actions/result/result'
import { getQuizForm, clearQuiz } from '../../../actions/quiz/quiz'

import '../../../styles/quiz.css'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const QuizResult = ({
  quizLoading,
  quiz,
  resultLoading,
  result,
  getResult,
  clearResult,
  getQuiz,
  clearQuiz
}) => {
  const browserHistory = useHistory()
  const query = useQuery()
  const quizId = query.get('quiz')
  const userId = query.get('user')

  useEffect(() => {
    getResult(quizId, userId)
    getQuiz(quizId)
    return () => {
      clearResult()
      clearQuiz()
    }
  }, [])

  const goToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  if ((quizLoading, resultLoading)) {
    return <Spinner />
  }

  return (
    <>
      <div className='container'>
        <div className='content col-md-8 mx-auto mt-3'>
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h1 className='mb-0'>
                {result.username}'s results for: <br />"{quiz.title}"
              </h1>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h3>By {quiz.user}</h3>
            </div>
          </div>
          <hr />
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h3 className='mb-0'>Overall score: {result.score * 100.0}%</h3>
            </div>
          </div>
          <hr />
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h3 className='mb-0'>Graded questions:</h3>
            </div>
          </div>
          <ScoredQuestionList
            questions={quiz.questions}
            results={result.answers}
          />
        </div>
      </div>
      <Footer confirmText={'Back to dashboard'} onConfirm={goToDashboard} />
    </>
  )
}

QuizResult.propTypes = {
  quizLoading: PropTypes.bool.isRequired,
  quiz: PropTypes.object,
  resultLoading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  getResult: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
  getQuiz: PropTypes.func.isRequired,
  clearQuiz: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  quizLoading: state.quiz.loading,
  quiz: state.quiz.data,
  resultLoading: state.result.loading,
  result: state.result.data
})

export default connect(mapStateToProps, {
  getResult,
  clearResult,
  getQuiz: getQuizForm,
  clearQuiz
})(QuizResult)
