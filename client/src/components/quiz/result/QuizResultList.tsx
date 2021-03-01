import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'

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

const colSize = {
  sm: 10,
  md: 8,
  lg: 7,
  xl: 6
}

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
        <Container fluid className="quiz-results">
          <Row>
            <Col {...colSize} className="quiz-results__block mx-auto">
              <Row className="mb-2 align-items-center">
                <Col>
                  <h3 className="mb-0">Results for quiz "{quiz!.title}":</h3>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col>
                  {results!.length === 0 ? (
                    <Row className="mb-1 align-items-center">
                      <Col>
                        <h6 className="mb-0">
                          Nobody has responded to this quiz!
                        </h6>
                      </Col>
                    </Row>
                  ) : (
                    <ListGroup className="w-100">
                      {results!.map((result, index) => {
                        return (
                          <ListGroup.Item key={index}>
                            <ResultItem result={result} />
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
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
