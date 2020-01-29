import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Footer from '../common/Footer'
import Spinner from '../../common/Spinner'
import ErrorPage from '../../errors/ErrorPage'
import ResultItem from './ResultItem'

import { getQuizResults, clearQuizResults } from '../../../actions/quizresults'
import { getQuiz, clearQuiz } from '../../../actions/quiz'

import '../../../styles/quiz.css'

const QuizResultList = ({
  quiz,
  quizResults,
  getQuizResults,
  clearQuizResults,
  getQuiz,
  clearQuiz
}) => {
  const browserHistory = useHistory()
  const { id: quizId } = useParams()

  useEffect(() => {
    getQuizResults(quizId)
    getQuiz(quizId)
    return () => {
      clearQuizResults()
      clearQuiz()
    }
  }, [])

  const goToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  const loading = quiz.loading || quizResults.loading

  if (loading) {
    return <Spinner />
  }

  if (quizResults.error) {
    return <ErrorPage status={quizResults.error.status} />
  }
  if (quiz.error) {
    return <ErrorPage status={quiz.error.status} />
  }

  const results = quizResults.results

  return (
    <>
      <div className='container'>
        <div className='content col-md-8 mx-auto mt-3'>
          <div className='row mb-2 align-items-center'>
            <h3 className='col mb-0'>Results for quiz "{quiz.quiz.title}":</h3>
          </div>

          <div className='row mb-2'>
            <div className='col'>
              {results.length === 0 ? (
                <div className='row mb-1 align-items-center'>
                  <h6 className='col mb-0'>
                    Nobody has responded to this quiz!
                  </h6>
                </div>
              ) : (
                <ul className='list-group w-100'>
                  {results.map((result, index) => {
                    return (
                      <li key={index} className='list-group-item'>
                        <ResultItem result={result} />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer confirmText={'Back to dashboard'} onConfirm={goToDashboard} />
    </>
  )
}

QuizResultList.propTypes = {
  quiz: PropTypes.object.isRequired,
  quizResults: PropTypes.object.isRequired,
  getQuizResults: PropTypes.func.isRequired,
  clearQuizResults: PropTypes.func.isRequired,
  getQuiz: PropTypes.func.isRequired,
  clearQuiz: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  quiz: state.quiz,
  quizResults: state.quizResults
})

export default connect(mapStateToProps, {
  getQuizResults,
  clearQuizResults,
  getQuiz,
  clearQuiz
})(QuizResultList)
