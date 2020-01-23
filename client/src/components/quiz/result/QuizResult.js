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
  quiz,
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

  if (quiz.loading || result.loading) {
    return <Spinner />
  }

  return (
    <>
      <div className='container'>
        <div className='content col-md-8 mx-auto mt-3'>
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h1 className='mb-0'>
                {result.data.username}'s results for: <br />"{quiz.data.title}"
              </h1>
            </div>
          </div>
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h3>By {quiz.data.user}</h3>
            </div>
          </div>
          <hr />
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h3 className='mb-0'>
                Overall score: {result.data.score * 100.0}%
              </h3>
            </div>
          </div>
          <hr />
          <div className='row mb-4'>
            <div className='col d-flex align-items-center'>
              <h3 className='mb-0'>Graded questions:</h3>
            </div>
          </div>
          <ScoredQuestionList
            questions={quiz.data.questions}
            results={result.data.answers}
          />
        </div>
      </div>
      <Footer confirmText={'Back to dashboard'} onConfirm={goToDashboard} />
    </>
  )
}

QuizResult.propTypes = {
  quiz: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  getResult: PropTypes.func.isRequired,
  clearResult: PropTypes.func.isRequired,
  getQuiz: PropTypes.func.isRequired,
  clearQuiz: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  result: state.result
})

export default connect(mapStateToProps, {
  getResult,
  clearResult,
  getQuiz: getQuizForm,
  clearQuiz
})(QuizResult)
