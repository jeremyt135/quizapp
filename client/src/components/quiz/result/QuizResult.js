import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import Footer from '../common/Footer'
import Spinner from '../../common/Spinner'
import ScoredQuestionList from './ScoredQuestionList'
import ErrorPage from '../../errors/ErrorPage'

import { getResult, clearResult } from '../../../actions/result'
import { getQuiz, clearQuiz } from '../../../actions/quiz'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

/**
 * Displays a single quiz result.
 * @param {object} props
 * @param {object} props.result Result state from redux
 * @param {{ loading: boolean, error: object, quiz: {
 *   questions: [{ text: string }],
 *   expiresIn: string,
 *   title: string, }}} props.quiz Quiz data from redux
 * @param {function} props.getResult Action creator to load result data
 * @param {function} props.clearResult Action creator to clear result data
 * @param {function} props.getQuiz Action creator to load quiz data
 * @param {function} props.clearQuiz Action creator to clear quiz data
 */
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

  if (quiz.loading || result.loading) {
    return <Spinner />
  }

  if (result.error && result.error.status !== 404) {
    return <ErrorPage status={result.error.status} />
  }
  if (quiz.error) {
    return <ErrorPage status={quiz.error.status} />
  }

  return (
    <>
      <div className='content'>
        <div className='quiz-results container-fluid'>
          <div className='row'>
            <div className='quiz-results__block col-sm-8 mx-auto'>
              <div className='row mb-4'>
                <div className='col d-flex align-items-center'>
                  <h2 className='mb-0'>
                    {result.result.username}'s results for: <br />"
                    {quiz.quiz.title}"
                  </h2>
                </div>
              </div>
              <div className='row mb-4'>
                <div className='col d-flex align-items-center'>
                  <h4>By {quiz.quiz.user}</h4>
                </div>
              </div>
              <hr />
              <div className='row mb-4'>
                <div className='col d-flex align-items-center'>
                  <h3 className='mb-0'>
                    Overall score: {result.result.score * 100.0}%
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
                questions={quiz.quiz.questions}
                results={result.result.answers}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer>
        <Button
          variant='success'
          className='ml-1'
          onClick={() => browserHistory.goBack()}>
          Go back
        </Button>
      </Footer>
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
  getQuiz,
  clearQuiz
})(QuizResult)
