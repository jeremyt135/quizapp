import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import { Button } from 'react-bootstrap'
import Footer from 'components/quiz/common/Footer'
import Spinner from 'components/common/Spinner'
import ErrorPage from 'components/errors/ErrorPage'
import ResultItem from './ResultItem'

import { createAlert } from 'store/alerts/thunks'
import { useQuiz, useResultList } from 'hooks'

const mapDispatch = {
  createAlert
}

const connector = connect(undefined, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays a list of results belonging to a quiz. This would only be accessed by the owner of the quiz.
 */
const QuizResultList = ({ createAlert }: Props) => {
  const browserHistory = useHistory()
  const { id } = useParams<{ id: string }>()

  const [quiz, quizError, quizLoading] = useQuiz(id, 'form')
  const [results, resultError, resultLoading] = useResultList(id, 'listing')

  const goToDashboard = () => {
    browserHistory.push('/dashboard')
  }

  if (quizLoading || resultLoading) {
    return <Spinner />
  } else if (quizError) {
    createAlert({
      msg: "We couldn't load your quiz right now.",
      type: 'danger'
    })
    return <ErrorPage status={quizError.status} />
  } else if (resultError) {
    createAlert({
      msg: "We couldn't load your quiz results right now.",
      type: 'danger'
    })
    return <ErrorPage status={resultError.status} />
  }

  return (
    <>
      <div className="content">
        <div className="quiz-results container-fluid">
          <div className="row">
            <div className="quiz-results__block col-sm-8 mx-auto">
              <div className="row mb-2 align-items-center">
                <h3 className="col mb-0">Results for quiz "{quiz!.title}":</h3>
              </div>

              <div className="row mb-2">
                <div className="col">
                  {results!.length === 0 ? (
                    <div className="row mb-1 align-items-center">
                      <h6 className="col mb-0">
                        Nobody has responded to this quiz!
                      </h6>
                    </div>
                  ) : (
                    <ul className="list-group w-100">
                      {results!.map((result, index) => {
                        return (
                          <li key={index} className="list-group-item">
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
        </div>
      </div>

      <Footer>
        <Button variant="success" className="ml-1" onClick={goToDashboard}>
          Back to dashboard
        </Button>
      </Footer>
    </>
  )
}

export default connector(QuizResultList)
